/*
  Anatomical cortical surface (fsaverage5 pial, FreeSurfer) watching the world.
  A photograph appears beside the occipital pole, breaks into its pixels, and
  the pixels stream into primary visual cortex, each half of the image going to
  the opposite hemisphere and the upper field to the lower bank of the
  calcarine and the centre of the image to the occipital pole. Activity then
  spreads out of V1 through visual cortex, which is tinted. Visual areas come
  from the HCP-MMP1.0 atlas (Glasser et al. 2016); they, the distance from V1
  through them and V1's retinotopy are precomputed in data/brain/fsaverage5.bin
  by _scripts/build_brain.py.
  Requires three.js (r128). Without WebGL, or with reduced motion, the still
  image already in #brain-container stays in place.
*/
(function () {
  var container = document.getElementById('brain-container');
  if (!container || typeof THREE === 'undefined' || !window.fetch) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var base = container.getAttribute('data-base') || '';
  var STIMULI = ['cat', 'face', 'coffee', 'rocket'];

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) { return; }
  if (!renderer.getContext()) return;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.domElement.className = 'brain-canvas';
  container.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var FOV = 24;
  var camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x7d8496, 0.5));
  var key = new THREE.DirectionalLight(0xfffaf2, 0.85);
  key.position.set(-1.2, 2.4, 2.6);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0xdfe6ff, 0.42);
  rim.position.set(2.2, 0.4, -2.2);
  scene.add(rim);

  // stage: stimulus card on the left, brain upright on the right with its
  // occipital pole turned toward the card
  var brainAnchor = new THREE.Group();
  scene.add(brainAnchor);
  var group = new THREE.Group();
  brainAnchor.add(group);
  // yaw -pi/2 is the right hemisphere's lateral surface; the brain sways
  // between that and a view from behind, keeping visual cortex in front
  var REST_YAW = -Math.PI / 2 + 0.45, SWAY = 0.4, REST_PITCH = 0.06;
  group.rotation.set(REST_PITCH, REST_YAW, 0);

  function srgb(hex) { return new THREE.Color(hex).convertSRGBToLinear(); }
  var cBase0 = srgb(0x6c6a72);   // sulcal floor
  var cBase1 = srgb(0xe3e1dd);   // gyral crest
  var cAct = srgb(0xe8680c), cPeak = srgb(0xffbf55);   // activity: surface tint, glowing peak
  var cVisual = srgb(0xa3d3cc);                          // visual cortex (HCP-MMP1 visual areas)
  var VFLAT = 0.35;                                      // how far that tint ignores sulcal shading

  // ---- timeline (seconds within one cycle) --------------------------------
  var CYCLE = 7.6;
  var APPEAR = 0.55, DISSOLVE = 1.6, SPREAD = 0.6;   // card in, card breaks up, spread of departures
  var FLIGHT = 0.95;                                  // mean flight time into V1
  var WAVE_AT = DISSOLVE + SPREAD * 0.35 + FLIGHT;    // when V1 lights up
  var WAVE_SPEED = 40, WAVE_WIDTH = 9;               // mm/s, mm

  var G = 44;                          // stimulus is broken into G x G pixels
  var P = G * G, TRAIL = 3;            // particles, points per particle (head + ghosts)

  var geometry, colorAttr, glowAttr, baseCol, dist, area, N, mesh, posArr;
  var labelVert = 0;
  var v1 = [[[], []], [[], []]];       // V1 vertices by hemisphere (0 lh, 1 rh) and bank (0 dorsal, 1 ventral), foveal first
  var card, cardMat, delayTex, particles, pAttr = {};
  var pStart = new Float32Array(P * 3), pLeave = new Float32Array(P),
      pDur = new Float32Array(P), pTarget = new Int32Array(P), pBend = new Float32Array(P * 3);
  var stimuli = [], stimIdx = 0, cycleT0 = 0, cycleN = -1;
  var waves = [];                      // start times of cortical waves
  var cardW = 0.78;

  function rng(seed) {
    return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  }

  // ---- load everything --------------------------------------------------------
  function loadImage(src) {
    return new Promise(function (res, rej) {
      var im = new Image();
      im.onload = function () { res(im); };
      im.onerror = rej;
      im.src = src;
    });
  }

  Promise.all([
    fetch(base + '/data/brain/meta.json').then(function (r) { return r.json(); }),
    fetch(base + '/data/brain/fsaverage5.bin').then(function (r) { return r.arrayBuffer(); }),
    Promise.all(STIMULI.map(function (n) { return loadImage(base + '/images/stimuli/' + n + '.jpg'); }))
  ]).then(function (res) {
    buildBrain(res[0], res[1]);
    buildStimuli(res[2]);
    buildCard();
    buildParticles();
    resize();
  }).catch(function (err) {
    if (window.console) console.warn('brain: failed to load', err);
  });

  function buildBrain(meta, buf) {
    N = meta.nVerts;
    var F = meta.nFaces, off = 0;
    var posQ = new Int16Array(buf, off, N * 3); off += N * 3 * 2;
    var idx = new Uint16Array(buf, off, F * 3); off += F * 3 * 2;
    var sulc = new Uint8Array(buf, off, N); off += N;
    var distQ = new Uint8Array(buf, off, N); off += N;
    area = new Uint8Array(buf, off, N); off += N;   // 1 V1, 2 V2-V4, 3 ventral, 4 MT+, 5 dorsal, 255 not visual
    var retino = new Uint8Array(buf, off, N);         // V1: bit 7 = ventral bank, low bits = eccentricity rank + 1

    posArr = new Float32Array(N * 3);
    var s = meta.posScale / 90.0;       // ~unit-scale brain
    for (var i = 0; i < N; i++) {
      // FreeSurfer (x right, y anterior, z superior) -> three.js (x, y up, z toward viewer)
      posArr[i * 3] = posQ[i * 3] * s;
      posArr[i * 3 + 1] = posQ[i * 3 + 2] * s;
      posArr[i * 3 + 2] = -posQ[i * 3 + 1] * s;
    }
    dist = new Float32Array(N);
    for (i = 0; i < N; i++) dist[i] = distQ[i] / 255 * meta.distMax;

    // one flat tint over visual cortex, its border softened by neighbour averaging
    var tint = new Float32Array(N);
    for (i = 0; i < N; i++) if (area[i] !== 255) tint[i] = 1;
    var acc = new Float32Array(N), cnt = new Float32Array(N);
    for (var it = 0; it < 2; it++) {
      acc.set(tint); cnt.fill(1);
      for (var f = 0; f < F * 3; f += 3) {
        var a0 = idx[f], a1 = idx[f + 1], a2 = idx[f + 2];
        acc[a0] += tint[a1] + tint[a2]; acc[a1] += tint[a0] + tint[a2]; acc[a2] += tint[a0] + tint[a1];
        cnt[a0] += 2; cnt[a1] += 2; cnt[a2] += 2;
      }
      for (i = 0; i < N; i++) tint[i] = acc[i] / cnt[i];
    }

    baseCol = new Float32Array(N * 3);
    var c = new THREE.Color(), tc = new THREE.Color();
    for (i = 0; i < N; i++) {
      var d = sulc[i] / 255;                 // 1 = deep sulcus in FreeSurfer's convention
      c.copy(cBase0).lerp(cBase1, 1 - Math.pow(d, 1.1));
      // multiply keeps the folds readable; the partial flat mix keeps the teal
      // reading as one even colour instead of darkening into the sulci
      tc.copy(c).multiply(cVisual).lerp(cVisual, VFLAT);
      c.lerp(tc, tint[i]);
      baseCol[i * 3] = c.r; baseCol[i * 3 + 1] = c.g; baseCol[i * 3 + 2] = c.b;
    }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(idx), 1));
    colorAttr = new THREE.BufferAttribute(new Float32Array(baseCol), 3);
    glowAttr = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
    geometry.setAttribute('color', colorAttr);
    geometry.setAttribute('glow', glowAttr);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    var ctr = new THREE.Vector3();
    geometry.boundingBox.getCenter(ctr);
    geometry.translate(-ctr.x, -ctr.y, -ctr.z);

    var half = N / 2;
    // label anchor: middle of the right hemisphere's lateral visual cortex
    // (which faces the viewer throughout the sway)
    var lat = [];
    for (i = half; i < N; i++) if (area[i] !== 255) lat.push(i);
    lat.sort(function (a, b) { return posQ[b * 3] - posQ[a * 3]; });
    lat = lat.slice(0, Math.round(lat.length * 0.3));
    var mx = 0, my = 0, mz = 0;
    lat.forEach(function (v) { mx += posQ[v * 3]; my += posQ[v * 3 + 1]; mz += posQ[v * 3 + 2]; });
    mx /= lat.length; my /= lat.length; mz /= lat.length;
    var best = 1e18;
    lat.forEach(function (v) {
      var dx = posQ[v * 3] - mx, dy = posQ[v * 3 + 1] - my, dz = posQ[v * 3 + 2] - mz;
      var dd = dx * dx + dy * dy + dz * dz;
      if (dd < best) { best = dd; labelVert = v; }
    });
    for (i = 0; i < N; i++) {
      if (area[i] === 1 && retino[i]) v1[i < half ? 0 : 1][retino[i] >> 7].push(i);
    }
    v1.forEach(function (h) {
      h.forEach(function (list) {
        list.sort(function (a, b) { return (retino[a] & 127) - (retino[b] & 127); });
      });
    });

    // Activity is added as per-vertex emissive light so it glows even in sulci.
    var material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.58, metalness: 0.0 });
    material.onBeforeCompile = function (sh) {
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nattribute vec3 glow;\nvarying vec3 vGlow;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvGlow = glow;');
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vGlow;')
        .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += vGlow;' +
          // soft cool rim so the silhouette reads against the page
          '\ntotalEmissiveRadiance += vec3(0.62, 0.68, 0.82) * pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 3.0) * 0.16;');
    };
    mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);
  }

  // Each stimulus: a texture for the card and a G x G grid of pixel colours.
  function buildStimuli(images) {
    var cv = document.createElement('canvas');
    cv.width = cv.height = G;
    var cx = cv.getContext('2d');
    images.forEach(function (im) {
      var tex = new THREE.Texture(im);
      tex.needsUpdate = true;
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      cx.drawImage(im, 0, 0, G, G);
      var px = cx.getImageData(0, 0, G, G).data;
      var cols = new Float32Array(P * 3);
      for (var j = 0; j < G; j++) {
        for (var i = 0; i < G; i++) {
          var k = (j * G + i) * 4, p = ((G - 1 - j) * G + i) * 3;   // row 0 = bottom
          cols[p] = px[k] / 255; cols[p + 1] = px[k + 1] / 255; cols[p + 2] = px[k + 2] / 255;
        }
      }
      stimuli.push({ tex: tex, cols: cols });
    });

    // departure order: the edge nearest the brain leaves first, with grain
    var r = rng(11), d = new Uint8Array(P * 4);
    for (var j = 0; j < G; j++) {
      for (var i = 0; i < G; i++) {
        var u = (i + 0.5) / G;
        var v = Math.max(0, Math.min(1, (1 - u) * 0.72 + r() * 0.28));
        var p = j * G + i;
        pLeave[p] = v;
        d[p * 4] = Math.round(v * 255); d[p * 4 + 3] = 255;
      }
    }
    delayTex = new THREE.DataTexture(d, G, G, THREE.RGBAFormat);
    delayTex.magFilter = delayTex.minFilter = THREE.NearestFilter;
    delayTex.needsUpdate = true;
    for (p = 0; p < P; p++) pLeave[p] = Math.round(pLeave[p] * 255) / 255;
  }

  // ---- stimulus card -----------------------------------------------------------
  var PAD = 0.16;   // extra plane around the card for its soft shadow
  function buildCard() {
    cardMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: {
        map: { value: stimuli[0].tex }, delays: { value: delayTex },
        uSize: { value: new THREE.Vector2(cardW, cardW) }, uPad: { value: PAD },
        uAppear: { value: 0 }, uGone: { value: -1 }, uPx: { value: 0.004 }
      },
      vertexShader: [
        'varying vec2 vP;',
        'uniform vec2 uSize; uniform float uPad;',
        'void main(){',
        '  vP = position.xy;',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);',
        '}'
      ].join('\n'),
      fragmentShader: [
        'uniform sampler2D map; uniform sampler2D delays;',
        'uniform vec2 uSize; uniform float uAppear; uniform float uGone; uniform float uPx;',
        'varying vec2 vP;',
        'float box(vec2 p, vec2 h, float r){ vec2 q = abs(p) - h + r; return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r; }',
        'void main(){',
        '  vec2 h = uSize * 0.5;',
        '  float rad = uSize.x * 0.05;',
        '  vec2 uv = vP / uSize + 0.5;',
        '  float inside = 1.0 - smoothstep(-uPx, uPx, box(vP, h, rad));',
        '  float left = step(uGone, texture2D(delays, uv).r - 0.0001);',   // this pixel has not left yet
        '  float ds = box(vP - vec2(0.012, -0.03), h * 0.96, rad);',
        '  float shadow = (1.0 - smoothstep(-0.02, 0.11, ds)) * 0.13 * uAppear * (1.0 - clamp(uGone * 1.6, 0.0, 1.0));',
        '  vec3 img = texture2D(map, clamp(uv, 0.0, 1.0)).rgb;',
        '  float a = inside * left * uAppear;',
        '  vec4 col = vec4(img, a);',
        '  vec4 sh = vec4(vec3(0.09, 0.12, 0.16), shadow * (1.0 - a));',
        '  gl_FragColor = vec4(mix(sh.rgb, col.rgb, a), a + sh.a);',
        '}'
      ].join('\n')
    });
    card = new THREE.Mesh(new THREE.PlaneGeometry(cardW + PAD * 2, cardW + PAD * 2), cardMat);
    card.renderOrder = 1;
    scene.add(card);
  }

  // ---- particles -----------------------------------------------------------------
  function buildParticles() {
    var n = P * TRAIL;
    var g = new THREE.BufferGeometry();
    pAttr.pos = new THREE.BufferAttribute(new Float32Array(n * 3), 3);
    pAttr.col = new THREE.BufferAttribute(new Float32Array(n * 3), 3);
    pAttr.size = new THREE.BufferAttribute(new Float32Array(n), 1);
    pAttr.alpha = new THREE.BufferAttribute(new Float32Array(n), 1);
    pAttr.prog = new THREE.BufferAttribute(new Float32Array(n), 1);
    g.setAttribute('position', pAttr.pos);
    g.setAttribute('pcolor', pAttr.col);
    g.setAttribute('size', pAttr.size);
    g.setAttribute('alpha', pAttr.alpha);
    g.setAttribute('prog', pAttr.prog);
    var mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uScale: { value: 300 } },
      vertexShader: [
        'attribute vec3 pcolor; attribute float size; attribute float alpha; attribute float prog;',
        'uniform float uScale;',
        'varying vec3 vC; varying float vA; varying float vR;',
        'void main(){',
        '  vec4 mv = modelViewMatrix * vec4(position, 1.0);',
        '  gl_PointSize = size * uScale / -mv.z;',
        '  gl_Position = projectionMatrix * mv;',
        // pixels turn into light on their way in: image colour -> amber -> warm white
        '  vec3 amber = vec3(0.98, 0.60, 0.20), hot = vec3(1.0, 0.93, 0.74);',
        '  vec3 c = mix(pcolor, amber, smoothstep(0.08, 0.55, prog));',
        '  vC = mix(c, hot, smoothstep(0.8, 1.0, prog));',
        '  vA = alpha; vR = smoothstep(0.0, 0.3, prog);',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 vC; varying float vA; varying float vR;',
        'void main(){',
        '  if (vA < 0.004) discard;',
        '  vec2 c = gl_PointCoord - 0.5;',
        '  float sq = max(abs(c.x), abs(c.y));',
        '  float d = mix(sq, length(c), vR);',
        // square pixel at first, then a soft round spark with a bright core
        '  float a = 1.0 - smoothstep(mix(0.49, 0.05, vR), 0.5, d);',
        '  vec3 col = mix(vC, vec3(1.0, 0.97, 0.9), vR * (1.0 - smoothstep(0.0, 0.22, d)) * 0.6);',
        '  gl_FragColor = vec4(col, a * vA);',
        '}'
      ].join('\n')
    });
    particles = new THREE.Points(g, mat);
    particles.frustumCulled = false;
    particles.renderOrder = 2;
    scene.add(particles);

    // fixed per-particle randomness: flight time, arc and landing site
    var r = rng(7);
    for (var p = 0; p < P; p++) {
      pDur[p] = FLIGHT * (0.8 + r() * 0.45);
      pBend[p * 3] = (r() - 0.5) * 0.5;
      pBend[p * 3 + 1] = 0.25 + r() * 0.35;
      pBend[p * 3 + 2] = (r() - 0.2) * 0.6;
      var i = p % G, j = Math.floor(p / G);
      // retinotopy: left half of the image -> right hemisphere, upper field ->
      // ventral bank of the calcarine, centre -> occipital pole, with the fovea
      // magnified (roughly log eccentricity)
      var u = (i + 0.5) / G - 0.5, v = (j + 0.5) / G - 0.5;
      var list = v1[u < 0 ? 1 : 0][v > 0 ? 1 : 0];
      var ecc = Math.min(1, Math.sqrt(u * u + v * v) / 0.62);
      var rank = Math.log(1 + 12 * ecc) / Math.log(13) * 0.9 + r() * 0.1;
      pTarget[p] = list[Math.min(list.length - 1, Math.floor(rank * list.length))];
    }
  }

  // ---- per-frame updates ------------------------------------------------------------
  var tmpV = new THREE.Vector3(), tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3();
  function smooth(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function easeInOut(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  function startCycle(t) {
    cycleN++;
    cycleT0 = t;
    stimIdx = cycleN % stimuli.length;
    cardMat.uniforms.map.value = stimuli[stimIdx].tex;
    var cols = stimuli[stimIdx].cols, pc = pAttr.col.array;
    for (var p = 0; p < P; p++) {
      for (var k = 0; k < TRAIL; k++) {
        var q = (p * TRAIL + k) * 3;
        pc[q] = cols[p * 3]; pc[q + 1] = cols[p * 3 + 1]; pc[q + 2] = cols[p * 3 + 2];
      }
    }
    pAttr.col.needsUpdate = true;
    waves.push(t + WAVE_AT);
    if (waves.length > 2) waves.shift();
  }

  function updateStimulus(t) {
    var c = t - cycleT0;
    var appear = smooth(c / APPEAR);
    var gone = (c - DISSOLVE) / SPREAD;   // fraction of the departure order that has left
    cardMat.uniforms.uAppear.value = appear;
    cardMat.uniforms.uGone.value = gone;
    var sc = 0.94 + 0.06 * easeInOut(Math.min(1, c / APPEAR));
    card.scale.set(sc, sc, 1);
    card.position.y = cardY + (1 - appear) * -0.04;

    var cellW = cardW / G;
    var pp = pAttr.pos.array, ps = pAttr.size.array, pa = pAttr.alpha.array, pr = pAttr.prog.array;
    mesh.updateMatrixWorld();
    var mw = mesh.matrixWorld;
    var arrived = 0;
    for (var p = 0; p < P; p++) {
      var i = p % G, j = Math.floor(p / G);
      var sx = card.position.x + ((i + 0.5) / G - 0.5) * cardW * sc;
      var sy = card.position.y + ((j + 0.5) / G - 0.5) * cardW * sc;
      var sz = card.position.z + 0.001;
      var ti = pTarget[p];
      tmpB.set(posArr[ti * 3], posArr[ti * 3 + 1], posArr[ti * 3 + 2]).applyMatrix4(mw);
      var leave = DISSOLVE + pLeave[p] * SPREAD;
      if (c >= leave + pDur[p]) arrived++;
      for (var k = 0; k < TRAIL; k++) {
        var o = p * TRAIL + k;
        var lag = k * 0.035;
        var f = (c - lag - leave) / pDur[p];
        if (f <= 0 || f >= 1 || c < leave) {
          pa[o] = 0; ps[o] = 0;
          continue;
        }
        var e = easeInOut(f);
        // quadratic arc from the card to V1, bowed out of the image plane
        tmpA.set((sx + tmpB.x) * 0.5 + pBend[p * 3], (sy + tmpB.y) * 0.5 + pBend[p * 3 + 1] * 0.5,
                 (sz + tmpB.z) * 0.5 + pBend[p * 3 + 2]);
        var a1 = (1 - e) * (1 - e), a2 = 2 * (1 - e) * e, a3 = e * e;
        pp[o * 3] = a1 * sx + a2 * tmpA.x + a3 * tmpB.x;
        pp[o * 3 + 1] = a1 * sy + a2 * tmpA.y + a3 * tmpB.y;
        pp[o * 3 + 2] = a1 * sz + a2 * tmpA.z + a3 * tmpB.z;
        var shrink = 1 - smooth(f * 1.4);
        var spark = smooth((f - 0.78) / 0.12) * (1 - smooth((f - 0.9) / 0.1));
        ps[o] = (cellW * (0.9 + 0.7 * shrink) + 0.022 * spark) * (k === 0 ? 1 : 0.85 - k * 0.2);
        pa[o] = (k === 0 ? 1 : 0.45 - k * 0.12) * (1 - smooth((f - 0.86) / 0.14));
        pr[o] = f;
      }
    }
    pAttr.pos.needsUpdate = pAttr.size.needsUpdate = pAttr.alpha.needsUpdate = pAttr.prog.needsUpdate = true;
    return arrived / P;
  }

  var tmpC = new THREE.Color();
  function updateActivity(t, arrivedFrac) {
    var colors = colorAttr.array, glow = glowAttr.array;
    var c = t - cycleT0;
    var v1Flash = 0.6 * arrivedFrac * (1 - smooth((c - WAVE_AT) / 0.5));
    for (var i = 0; i < N; i++) {
      var st = area[i];
      var r = baseCol[i * 3], g = baseCol[i * 3 + 1], b = baseCol[i * 3 + 2];
      var gr = 0, gg = 0, gb = 0;
      if (st !== 255) {
        var d = dist[i], a = 0;
        for (var w = 0; w < waves.length; w++) {
          var age = t - waves[w];
          if (age <= 0) continue;
          var x = (age * WAVE_SPEED - d) / WAVE_WIDTH;
          if (x < -2.5) continue;
          var fade = 1 - smooth((age - 3.0) / 1.6);
          var v = Math.exp(-x * x * 0.9) * fade * (1 - d / 230);
          if (v > a) a = v;
        }
        if (d < 12) a = Math.max(a, v1Flash * (1 - d / 12));
        if (a > 0.01) {
          // the surface takes the saturated hue; the brightness comes
          // from emission, so peaks glow instead of washing out under the lights
          var k = smooth((a - 0.16) / 0.2) * 0.94;   // near-threshold, like a statistical map: no pastel wash
          r += (cAct.r - r) * k; g += (cAct.g - g) * k; b += (cAct.b - b) * k;
          tmpC.copy(cAct).lerp(cPeak, a * a);
          var e = k * k * Math.pow(a, 1.5) * 0.4;
          gr = tmpC.r * e; gg = tmpC.g * e; gb = tmpC.b * e;
        }
      }
      colors[i * 3] = r; colors[i * 3 + 1] = g; colors[i * 3 + 2] = b;
      glow[i * 3] = gr; glow[i * 3 + 1] = gg; glow[i * 3 + 2] = gb;
    }
    colorAttr.needsUpdate = true;
    glowAttr.needsUpdate = true;
  }

  // ---- interaction ---------------------------------------------------------------------
  var dragging = false, lastX = 0, lastY = 0, dragYaw = 0, dragPitch = 0;
  var el = renderer.domElement;
  el.style.cursor = 'grab';
  el.addEventListener('pointerdown', function (e) {
    dragging = true; lastX = e.clientX; lastY = e.clientY; el.style.cursor = 'grabbing';
    if (el.setPointerCapture) el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    dragYaw += (e.clientX - lastX) * 0.008;
    dragPitch = Math.max(-0.7, Math.min(0.7, dragPitch + (e.clientY - lastY) * 0.005));
    lastX = e.clientX; lastY = e.clientY;
  });
  function endDrag() { dragging = false; el.style.cursor = 'grab'; }
  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);
  el.addEventListener('pointerleave', endDrag);

  // ---- label ------------------------------------------------------------------------------
  var NS = 'http://www.w3.org/2000/svg';
  var label = document.createElement('div');
  label.className = 'brain-label';
  label.innerHTML = '<svg><line/><circle r="2.6"/></svg><span>Visual cortex</span>';
  container.appendChild(label);
  var lSvg = label.querySelector('svg'), lLine = label.querySelector('line'),
      lDot = label.querySelector('circle'), lText = label.querySelector('span');
  var anchorV = new THREE.Vector3();
  function updateLabel() {
    var w = container.clientWidth, h = container.clientHeight;
    anchorV.set(posArr[labelVert * 3], posArr[labelVert * 3 + 1], posArr[labelVert * 3 + 2])
      .applyMatrix4(mesh.matrixWorld).project(camera);
    var ax = (anchorV.x + 1) / 2 * w, ay = (1 - anchorV.y) / 2 * h;
    var tx = ax - 30, ty = h - 12;               // text sits under the brain
    lSvg.setAttribute('width', w); lSvg.setAttribute('height', h);
    lDot.setAttribute('cx', ax.toFixed(1)); lDot.setAttribute('cy', ay.toFixed(1));
    lLine.setAttribute('x1', ax.toFixed(1)); lLine.setAttribute('y1', (ay + 4).toFixed(1));
    lLine.setAttribute('x2', tx.toFixed(1)); lLine.setAttribute('y2', (ty - 12).toFixed(1));
    lText.style.transform = 'translate(' + (tx - 4).toFixed(1) + 'px,' + (ty - 9).toFixed(1) + 'px) translateX(-50%)';
  }

  // ---- layout / sizing -------------------------------------------------------------------
  var cardY = 0;
  function resize() {
    var w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // fit a stage ~3.3 wide x 1.75 tall (card + gap + brain)
    var tanH = Math.tan(FOV * Math.PI / 360);
    var dist = Math.max(0.95 / tanH, 1.66 / (tanH * camera.aspect));
    camera.position.set(0, 0.05, dist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    brainAnchor.position.set(0.55, 0, 0);
    if (card) {
      card.position.set(-1.0, cardY, 0.25);
      cardMat.uniforms.uPx.value = 1.5 * (2 * dist * tanH) / h;
    }
    if (particles) particles.material.uniforms.uScale.value = h * renderer.getPixelRatio() / (2 * tanH);
  }
  window.addEventListener('resize', resize);

  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }, { threshold: 0.05 })
      .observe(container);
  }

  var clock = new THREE.Clock();
  var lastT = 0;
  function frame() {
    requestAnimationFrame(frame);
    if (!visible || !particles) return;
    var t = clock.getElapsedTime();
    var dt = Math.min(0.05, t - lastT);
    lastT = t;
    if (cycleN < 0 || t - cycleT0 >= CYCLE) startCycle(t);

    // gentle rocking about the rest pose; a drag springs back to it
    if (!dragging) { dragYaw *= Math.pow(0.12, dt); dragPitch *= Math.pow(0.12, dt); }
    group.rotation.y = REST_YAW + SWAY * Math.sin(t * 0.21) + dragYaw;
    group.rotation.x = REST_PITCH + dragPitch;

    var frac = updateStimulus(t);
    updateActivity(t, frac);
    renderer.render(scene, camera);
    updateLabel();
    // reveal the canvas over the still image once it has something to show
    if (!shown) { shown = true; container.classList.add('is-ready'); }
  }
  var shown = false;
  frame();
})();
