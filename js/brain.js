/*
  Procedural 3D brain: two displaced hemisphere meshes with gyral folding,
  cerebellum and brainstem, lit with vertex colours. Neural activity starts at
  primary visual cortex (occipital pole) and propagates forward along the
  ventral and dorsal visual streams. Requires three.js (global THREE).
*/
(function () {
  var container = document.getElementById('brain-container');
  if (!container || typeof THREE === 'undefined') return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0.1, 4.05);

  var key = new THREE.DirectionalLight(0xffffff, 0.75);
  key.position.set(-1.2, 1.6, 2.0);
  scene.add(key);
  var fill = new THREE.DirectionalLight(0x9fb8ff, 0.22);
  fill.position.set(1.5, -0.5, -1.0);
  scene.add(fill);
  scene.add(new THREE.AmbientLight(0x6f86b8, 0.4));

  var brain = new THREE.Group();
  scene.add(brain);
  brain.rotation.y = -1.15;

  // ---- noise --------------------------------------------------------------
  function hash(x, y, z) {
    var n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
    return n - Math.floor(n);
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(t) { return t * t * (3 - 2 * t); }
  function noise(x, y, z) {
    var ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
    var fx = smooth(x - ix), fy = smooth(y - iy), fz = smooth(z - iz);
    var c000 = hash(ix, iy, iz), c100 = hash(ix + 1, iy, iz);
    var c010 = hash(ix, iy + 1, iz), c110 = hash(ix + 1, iy + 1, iz);
    var c001 = hash(ix, iy, iz + 1), c101 = hash(ix + 1, iy, iz + 1);
    var c011 = hash(ix, iy + 1, iz + 1), c111 = hash(ix + 1, iy + 1, iz + 1);
    return lerp(
      lerp(lerp(c000, c100, fx), lerp(c010, c110, fx), fy),
      lerp(lerp(c001, c101, fx), lerp(c011, c111, fx), fy),
      fz
    );
  }
  // Ridged noise: high on gyral crests, sharp valleys in sulci.
  function ridged(x, y, z) {
    var n1 = 1 - Math.abs(2 * noise(x, y, z) - 1);
    var n2 = 1 - Math.abs(2 * noise(x * 2.1 + 5.3, y * 2.1 + 1.7, z * 2.1) - 1);
    var n3 = 1 - Math.abs(2 * noise(x * 4.3 + 9.1, y * 4.3, z * 4.3 + 2.2) - 1);
    return 0.55 * n1 + 0.3 * n2 + 0.15 * n3;
  }

  var seed = 11;
  function rand() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  // ---- cortex -------------------------------------------------------------
  // Axes: x = left/right, y = up, z = front (+) / back (-).

  // Sylvian fissure: a groove on each lateral surface, from the temporal pole
  // rising backward. Returns distance in y from the groove centre line.
  function sylvian(x, y, z) {
    if (Math.abs(x) < 0.5) return 1;
    var tz = (0.6 - z) / 1.05;
    if (tz < 0 || tz > 1) return 1;
    var gy = -0.1 + 0.34 * tz;
    return Math.abs(y - gy);
  }

  // Shape a unit-sphere direction into a hemisphere surface point.
  function cortexPoint(dx, dy, dz, side, out) {
    var ax = 0.80;
    var sm = function (t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
    // Front-back length: frontal pole slightly shorter than occipital.
    var az = lerp(1.04, 0.92, sm((dz + 0.2) / 0.6));
    // Height: flatter underside, temporal lobe hanging lower toward the back,
    // and a gentle occipital slope on top.
    var below = sm((-dy + 0.1) / 0.4);
    var ayTop = lerp(0.70, 0.64, sm((-dz - 0.15) / 0.5));
    var ayBottom = lerp(0.56, 0.68, sm((0.3 - dz) / 0.5));
    var ay = lerp(ayTop, ayBottom, below);
    var y = dy * ay, z = dz * az;
    // Each hemisphere is its own rounded body; the medial side is flattened
    // into a wall that faces the other hemisphere across the fissure.
    var lateral = dx * side > 0;
    var m = Math.abs(dx);
    var x = lateral ? side * (0.46 + 0.40 * m * ax / 0.8)
                    : side * (0.46 - 0.42 * Math.pow(m, 0.5));
    var medial = lateral ? 0 : 1;
    // Folding: domain-warped, anisotropic ridged noise so sulci run as
    // sinuous grooves rather than isotropic bumps.
    var wx = x + 0.25 * (noise(x * 1.6 + 3, y * 1.6, z * 1.6) - 0.5);
    var wy = y + 0.25 * (noise(x * 1.6, y * 1.6 + 7, z * 1.6) - 0.5);
    var wz = z + 0.25 * (noise(x * 1.6, y * 1.6, z * 1.6 + 11) - 0.5);
    var rg = ridged(wx * 6.0 + 10, wy * 6.0 + 4, wz * 3.0);
    rg = Math.pow(rg, 2.4);
    var amp = medial ? 0.03 : 0.085;
    var g = 1 - amp * (1 - rg);            // sulci cut inward, crests stay on the hull
    var syl = sylvian(x, y, z);
    g -= 0.07 * Math.exp(-(syl / 0.05) * (syl / 0.05));
    out.x = x * g; out.y = y * g; out.z = z * g;
    return rg;
  }

  // Lane is continuous: 0 at the temporal underside, 1 at the parietal top.
  function laneOf(y) {
    var t = (y + 0.15) / 0.5;
    t = Math.max(0, Math.min(1, t));
    return t * t * (3 - 2 * t);
  }
  function affinity(pulseLane, lane) {
    var d = Math.abs(lane - pulseLane);
    return 0.1 + 0.9 * Math.exp(-d * d * 7.0);
  }


  var cortexMaterial = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.88,
    metalness: 0.05,
    flatShading: false
  });

  var meshes = [];   // {mesh, base(Float32Array rgb), stream, lane, act, count}
  var baseCrest = new THREE.Color(0x8ea8dc);
  var baseSulcus = new THREE.Color(0x101f45);
  var hot = new THREE.Color(0xffb347);
  var white = new THREE.Color(0xfff4de);

  function buildHemisphere(side) {
    var geo = new THREE.SphereGeometry(1, 260, 180);
    var pos = geo.attributes.position;
    var n = pos.count;
    var colors = new Float32Array(n * 3);
    var base = new Float32Array(n * 3);
    var stream = new Float32Array(n);
    var lane = new Float32Array(n);
    var p = new THREE.Vector3();
    var tmp = { x: 0, y: 0, z: 0 };
    var c = new THREE.Color();
    for (var i = 0; i < n; i++) {
      p.fromBufferAttribute(pos, i);
      var rg = cortexPoint(p.x, p.y, p.z, side, tmp);
      pos.setXYZ(i, tmp.x, tmp.y, tmp.z);
      c.copy(baseSulcus).lerp(baseCrest, Math.min(1, Math.max(0, (rg - 0.05) * 1.25)));
      base[i * 3] = c.r; base[i * 3 + 1] = c.g; base[i * 3 + 2] = c.b;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      stream[i] = Math.max(0, Math.min(1, (tmp.z + 1.05) / 1.95));
      lane[i] = laneOf(tmp.y);
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    var mesh = new THREE.Mesh(geo, cortexMaterial);
    brain.add(mesh);
    meshes.push({ mesh: mesh, base: base, stream: stream, lane: lane, act: new Float32Array(n), count: n, cortex: true });
  }
  buildHemisphere(-1);
  buildHemisphere(1);

  // Cerebellum.
  (function () {
    var geo = new THREE.SphereGeometry(1, 96, 64);
    var pos = geo.attributes.position, n = pos.count;
    var colors = new Float32Array(n * 3);
    var p = new THREE.Vector3(), c = new THREE.Color();
    for (var i = 0; i < n; i++) {
      p.fromBufferAttribute(pos, i);
      var x = p.x * 0.42, y = p.y * 0.2, z = p.z * 0.3;
      var rg = ridged(x * 9 + 30, y * 9, z * 9);
      var g = 1 + (rg - 0.55) * 0.08;
      // Horizontal folia: fine ridges across y.
      g += 0.012 * Math.sin(y * 90);
      pos.setXYZ(i, x * g, y * g - 0.5, z * g - 0.7);
      c.copy(baseSulcus).lerp(baseCrest, Math.min(1, Math.max(0, (rg - 0.25) * 1.4)));
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    brain.add(new THREE.Mesh(geo, cortexMaterial));
  })();

  // Brainstem.
  (function () {
    var geo = new THREE.CylinderGeometry(0.1, 0.13, 0.42, 32, 8, false);
    var pos = geo.attributes.position, n = pos.count;
    var colors = new Float32Array(n * 3);
    var c = baseSulcus.clone().lerp(baseCrest, 0.45);
    for (var i = 0; i < n; i++) {
      pos.setXYZ(i, pos.getX(i), pos.getY(i) - 0.62, pos.getZ(i) - 0.28);
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    brain.add(new THREE.Mesh(geo, cortexMaterial));
  })();

  // ---- spike layer: sparse neurons that flash when a wave passes ----------
  var NS = 600;
  var spPos = new Float32Array(NS * 3);
  var spAct = new Float32Array(NS);
  var spStream = new Float32Array(NS);
  var spLane = new Float32Array(NS);
  var spPhase = new Float32Array(NS);
  var tmpS = { x: 0, y: 0, z: 0 };
  for (var s = 0; s < NS; s++) {
    var u = rand() * 2 - 1, th = rand() * Math.PI * 2, rr = Math.sqrt(1 - u * u);
    var side = rand() < 0.5 ? -1 : 1;
    var dx = Math.abs(rr * Math.cos(th)) * side, dy = u, dz = rr * Math.sin(th);
    cortexPoint(dx, dy, dz, side, tmpS);
    spPos[s * 3] = tmpS.x * 1.01; spPos[s * 3 + 1] = tmpS.y * 1.01; spPos[s * 3 + 2] = tmpS.z * 1.01;
    spStream[s] = Math.max(0, Math.min(1, (tmpS.z + 1.05) / 1.95));
    spLane[s] = laneOf(tmpS.y);
    spPhase[s] = rand();
  }
  var spGeo = new THREE.BufferGeometry();
  spGeo.setAttribute('position', new THREE.BufferAttribute(spPos, 3));
  spGeo.setAttribute('aActivation', new THREE.BufferAttribute(spAct, 1));
  var spMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uPixelRatio: { value: renderer.getPixelRatio() } },
    vertexShader: [
      'attribute float aActivation; uniform float uPixelRatio; varying float vA;',
      'void main(){ vA = aActivation; vec4 mv = modelViewMatrix * vec4(position,1.0);',
      '  gl_PointSize = (1.0 + aActivation * 9.0) * uPixelRatio * (2.6 / -mv.z);',
      '  gl_Position = projectionMatrix * mv; }'
    ].join('\n'),
    fragmentShader: [
      'precision mediump float; varying float vA;',
      'void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c); if (d > 0.5) discard;',
      '  float a = smoothstep(0.5, 0.0, d) * vA;',
      '  gl_FragColor = vec4(mix(vec3(1.0,0.75,0.35), vec3(1.0,0.97,0.9), vA), a); }'
    ].join('\n')
  });
  brain.add(new THREE.Points(spGeo, spMat));

  // ---- activity model -----------------------------------------------------
  var pulses = [];
  var nextPulseAt = 0.8;
  function spawnPulse(t) {
    var r = rand();
    pulses.push({
      t0: t,
      speed: 0.38 + rand() * 0.12,
      lane: r < 0.45 ? 0 : (r < 0.9 ? 1 : 0.5),
      width: 0.075 + rand() * 0.03,
      strength: 0.85 + rand() * 0.25
    });
  }

  function waveAt(s, ln, t) {
    var a = 0;
    for (var q = 0; q < pulses.length; q++) {
      var pu = pulses[q];
      var front = (t - pu.t0) * pu.speed;
      var d = (front - s) / pu.width;
      if (d > -1.6 && d < 3.5) {
        var v = pu.strength * affinity(pu.lane, ln) * Math.exp(-d * d * 0.8) * (1 - 0.3 * s);
        if (v > a) a = v;
      }
    }
    return a;
  }

  var clock = new THREE.Clock();
  var lastT = 0;
  var c1 = new THREE.Color();

  function updateActivity(t, dt) {
    if (t > nextPulseAt) {
      spawnPulse(t);
      nextPulseAt = t + 1.2 + rand() * 1.3;
    }
    for (var p = pulses.length - 1; p >= 0; p--) {
      if ((t - pulses[p].t0) * pulses[p].speed > 1.4) pulses.splice(p, 1);
    }
    var decay = Math.exp(-dt * 2.2);
    for (var m = 0; m < meshes.length; m++) {
      var M = meshes[m];
      var colors = M.mesh.geometry.attributes.color.array;
      for (var i = 0; i < M.count; i++) {
        var a = M.act[i] * decay;
        var w = waveAt(M.stream[i], M.lane[i], t);
        if (w > a) a = w;
        M.act[i] = a;
        var r = M.base[i * 3], g = M.base[i * 3 + 1], b = M.base[i * 3 + 2];
        if (a > 0.01) {
          var k = Math.min(1, a / 0.6);
          r = lerp(r, hot.r, k); g = lerp(g, hot.g, k); b = lerp(b, hot.b, k);
          if (a > 0.6) {
            var k2 = (a - 0.6) / 0.4;
            r = lerp(r, white.r, k2); g = lerp(g, white.g, k2); b = lerp(b, white.b, k2);
          }
        }
        colors[i * 3] = r; colors[i * 3 + 1] = g; colors[i * 3 + 2] = b;
      }
      M.mesh.geometry.attributes.color.needsUpdate = true;
    }
    // Spikes: flash briefly on the wave front, plus sparse spontaneous events.
    var sdecay = Math.exp(-dt * 6);
    for (var s = 0; s < NS; s++) {
      var sa = spAct[s] * sdecay;
      var sw = waveAt(spStream[s], spLane[s], t);
      if (sw > 0.55 && spPhase[s] < 0.7) sa = Math.max(sa, sw);
      if (Math.sin(t * 0.9 + spPhase[s] * 400) > 0.9995) sa = Math.max(sa, 0.7);
      spAct[s] = sa;
    }
    spGeo.attributes.aActivation.needsUpdate = true;
  }

  // ---- interaction --------------------------------------------------------
  var dragging = false, lastX = 0, lastY = 0, velX = 0, targetTilt = 0.1;
  var el = renderer.domElement;
  el.style.cursor = 'grab';
  el.addEventListener('pointerdown', function (e) {
    dragging = true; lastX = e.clientX; lastY = e.clientY; el.style.cursor = 'grabbing';
    el.setPointerCapture && el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    brain.rotation.y += dx * 0.008;
    velX = dx * 0.008;
    targetTilt = Math.max(-0.6, Math.min(0.6, targetTilt + dy * 0.004));
  });
  function endDrag() { dragging = false; el.style.cursor = 'grab'; }
  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);
  el.addEventListener('pointerleave', endDrag);

  // ---- sizing / visibility ------------------------------------------------
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
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }, { threshold: 0.05 }).observe(container);
  }

  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    var t = clock.getElapsedTime();
    var dt = Math.min(0.05, t - lastT);
    lastT = t;
    if (!dragging) {
      if (!reduceMotion) brain.rotation.y += 0.002 + velX;
      velX *= 0.92;
    }
    brain.rotation.x += (targetTilt - brain.rotation.x) * 0.05;
    if (!reduceMotion) updateActivity(t, dt);
    renderer.render(scene, camera);
  }
  frame();
})();
