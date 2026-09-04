/*
  Anatomical cortical surface (fsaverage5 pial, FreeSurfer) with activity that
  starts in primary visual cortex and spreads along the ventral and dorsal
  visual pathways, using geodesic distance from V1 and Destrieux-atlas region
  membership precomputed in data/brain/fsaverage5.bin. Requires three.js.
*/
(function () {
  var container = document.getElementById('brain-container');
  if (!container || typeof THREE === 'undefined' || !window.fetch) return;

  var base = container.getAttribute('data-base') || '';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0.2, 3.5);
  camera.lookAt(0, 0, 0);

  var hemi = new THREE.HemisphereLight(0xffffff, 0x9aa3b5, 0.55);
  scene.add(hemi);
  var key = new THREE.DirectionalLight(0xffffff, 0.8);
  key.position.set(-1.5, 2.2, 2.5);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0xc9d6f5, 0.3);
  rim.position.set(2, -0.5, -2);
  scene.add(rim);

  var group = new THREE.Group();
  scene.add(group);
  group.rotation.y = Math.PI / 2;   // left hemisphere lateral surface faces the viewer
  group.rotation.x = 0.06;

  // Colours are authored in sRGB and converted to linear for the sRGB-encoded output.
  function srgb(hex) { return new THREE.Color(hex).convertSRGBToLinear(); }
  var cBase0 = srgb(0x5f6676);   // sulcal floor
  var cBase1 = srgb(0xd7dae2);   // gyral crest
  var ramp = [
    srgb(0x8a1a1a), srgb(0xd4341c), srgb(0xf5801c), srgb(0xffc63a), srgb(0xfff4c2)
  ];
  function rampColor(t, out) {
    t = Math.max(0, Math.min(0.9999, t)) * (ramp.length - 1);
    var i = Math.floor(t), f = t - i;
    out.copy(ramp[i]).lerp(ramp[i + 1], f);
    return out;
  }

  var geometry, colorAttr, baseCol, dist, stream, N;
  var act;

  Promise.all([
    fetch(base + '/data/brain/meta.json').then(function (r) { return r.json(); }),
    fetch(base + '/data/brain/fsaverage5.bin').then(function (r) { return r.arrayBuffer(); })
  ]).then(function (res) {
    var meta = res[0], buf = res[1];
    N = meta.nVerts;
    var F = meta.nFaces;
    var off = 0;
    var posQ = new Int16Array(buf, off, N * 3); off += N * 3 * 2;
    var idx = new Uint16Array(buf, off, F * 3); off += F * 3 * 2;
    var sulc = new Uint8Array(buf, off, N); off += N;
    var distQ = new Uint8Array(buf, off, N); off += N;
    stream = new Uint8Array(buf, off, N);

    var pos = new Float32Array(N * 3);
    var s = meta.posScale / 90.0;       // ~unit-scale brain
    for (var i = 0; i < N; i++) {
      // FreeSurfer (x right, y anterior, z superior) -> three.js (x, y up, z toward viewer)
      pos[i * 3] = posQ[i * 3] * s;
      pos[i * 3 + 1] = posQ[i * 3 + 2] * s;
      pos[i * 3 + 2] = -posQ[i * 3 + 1] * s;
    }
    dist = new Float32Array(N);
    for (i = 0; i < N; i++) dist[i] = distQ[i] / 255 * meta.distMax;

    baseCol = new Float32Array(N * 3);
    var colors = new Float32Array(N * 3);
    var c = new THREE.Color();
    for (i = 0; i < N; i++) {
      var d = sulc[i] / 255;                 // 1 = deep sulcus in FreeSurfer's convention
      var crest = 1 - Math.pow(d, 1.4);
      c.copy(cBase0).lerp(cBase1, crest);
      baseCol[i * 3] = c.r; baseCol[i * 3 + 1] = c.g; baseCol[i * 3 + 2] = c.b;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(idx), 1));
    colorAttr = new THREE.BufferAttribute(colors, 3);
    geometry.setAttribute('color', colorAttr);
    geometry.computeVertexNormals();
    geometry.center();

    var material = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0.62, metalness: 0.0
    });
    var mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);
    act = new Float32Array(N);
    container.classList.add('is-ready');
  }).catch(function (err) {
    if (window.console) console.warn('brain: failed to load surface', err);
  });

  // ---- activity ----------------------------------------------------------
  // A pulse leaves V1 and travels along the cortex at `speed` mm/s. Its
  // affinity for a vertex depends on whether that vertex lies in the ventral
  // stream (0), dorsal stream (1) or early visual cortex (2).
  var pulses = [];
  var nextPulseAt = 1.0;
  var seed = 3;
  function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  function spawnPulse(t) {
    var r = rand();
    pulses.push({
      t0: t,
      speed: 55 + rand() * 20,
      lane: r < 0.42 ? 0 : (r < 0.84 ? 1 : 2),
      width: 9 + rand() * 4,
      strength: 0.85 + rand() * 0.2
    });
  }

  var tmpC = new THREE.Color();
  function updateActivity(t, dt) {
    if (t > nextPulseAt) { spawnPulse(t); nextPulseAt = t + 2.2 + rand() * 1.8; }
    for (var p = pulses.length - 1; p >= 0; p--) {
      if ((t - pulses[p].t0) * pulses[p].speed > 190) pulses.splice(p, 1);
    }
    var decay = Math.exp(-dt / 0.55);
    var colors = colorAttr.array;
    var v1glow = 0.12 + 0.08 * Math.sin(t * 1.3);
    for (var i = 0; i < N; i++) {
      var st = stream[i];
      var a = act[i] * decay;
      if (st !== 255) {
        var d = dist[i];
        for (var q = 0; q < pulses.length; q++) {
          var pu = pulses[q];
          var aff;
          if (st === 2) aff = 1;
          else if (pu.lane === 2) aff = 0.7;
          else aff = st === pu.lane ? 1 : 0.12;
          var front = (t - pu.t0) * pu.speed;
          var x = (front - d) / pu.width;
          if (x > -2.5 && x < 2.5) {
            var w = pu.strength * aff * Math.exp(-x * x * 0.7) * (1 - d / 220);
            if (w > a) a = w;
          }
        }
        if (d < 14) a = Math.max(a, v1glow * (1 - d / 14));
      }
      act[i] = a;
      var r = baseCol[i * 3], g = baseCol[i * 3 + 1], b = baseCol[i * 3 + 2];
      if (a > 0.02) {
        rampColor(a, tmpC);
        var k = Math.min(1, a * 3.2);
        r += (tmpC.r - r) * k; g += (tmpC.g - g) * k; b += (tmpC.b - b) * k;
      }
      colors[i * 3] = r; colors[i * 3 + 1] = g; colors[i * 3 + 2] = b;
    }
    colorAttr.needsUpdate = true;
  }

  // ---- interaction ---------------------------------------------------------
  var dragging = false, lastX = 0, lastY = 0, velY = 0, targetTilt = 0.06;
  var el = renderer.domElement;
  el.style.cursor = 'grab';
  el.addEventListener('pointerdown', function (e) {
    dragging = true; lastX = e.clientX; lastY = e.clientY; el.style.cursor = 'grabbing';
    if (el.setPointerCapture) el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    group.rotation.y += dx * 0.008;
    velY = dx * 0.008;
    targetTilt = Math.max(-0.8, Math.min(0.8, targetTilt + dy * 0.005));
  });
  function endDrag() { dragging = false; el.style.cursor = 'grab'; }
  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);
  el.addEventListener('pointerleave', endDrag);

  // ---- sizing / visibility -------------------------------------------------
  function resize() {
    var w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
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
    if (!visible) return;
    var t = clock.getElapsedTime();
    var dt = Math.min(0.05, t - lastT);
    lastT = t;
    if (!dragging) {
      if (!reduceMotion) group.rotation.y += 0.0032 + velY;
      velY *= 0.9;
    }
    group.rotation.x += (targetTilt - group.rotation.x) * 0.06;
    if (geometry && !reduceMotion) updateActivity(t, dt);
    renderer.render(scene, camera);
  }
  frame();
})();
