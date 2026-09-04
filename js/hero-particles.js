/*
  Hero particles: 140 points that drift, then assemble into an eye, a brain
  (traced from the fsaverage lateral surface: outline, central sulcus, Sylvian
  fissure, superior temporal sulcus) and a neural network, in turn.
*/
(function () {
  var canvas = document.getElementById('network-animation');
  var container = document.getElementById('animation-container');
  if (!canvas || !container) return;
  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  function resizeCanvas() {
    var rect = container.getBoundingClientRect();
    canvas.width = Math.round(rect.width * DPR);
    canvas.height = Math.round(rect.height * DPR);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  function W() { return canvas.width / DPR; }
  function H() { return canvas.height / DPR; }

  var particles = [];
  var particleCount = 140;
  var particleRadius = 2;
  var currentFormation = 1;      // start on the brain
  var animationPhase = 0;        // 0 drift, 1 forming, 2 formed, 3 dispersing
  var phaseTimer = 0;
  var transitionProgress = 0;
  var particleColor = 'rgba(31, 79, 154, 0.9)';

  // ---- brain shape from the fsaverage5 left hemisphere (lateral view) ----
  var BRAIN = {"outline":[[-0.4836,0.012],[-0.4796,0.0005],[-0.4756,-0.0123],[-0.4711,-0.0242],[-0.4665,-0.0361],[-0.4613,-0.048],[-0.4564,-0.0599],[-0.451,-0.0714],[-0.4458,-0.0821],[-0.44,-0.094],[-0.4357,-0.1046],[-0.4302,-0.1165],[-0.426,-0.1278],[-0.4211,-0.1387],[-0.4162,-0.1491],[-0.4108,-0.1601],[-0.4056,-0.1707],[-0.3998,-0.1817],[-0.3946,-0.1917],[-0.3888,-0.2027],[-0.3836,-0.2125],[-0.3772,-0.2228],[-0.3712,-0.2329],[-0.3645,-0.2429],[-0.3578,-0.253],[-0.3507,-0.2633],[-0.3443,-0.2743],[-0.338,-0.2856],[-0.3319,-0.2968],[-0.3258,-0.3087],[-0.32,-0.3197],[-0.3136,-0.3303],[-0.3066,-0.3407],[-0.299,-0.3507],[-0.2904,-0.3614],[-0.2819,-0.3718],[-0.2737,-0.3818],[-0.2648,-0.3913],[-0.2557,-0.4004],[-0.2463,-0.4092],[-0.2359,-0.4181],[-0.2253,-0.4266],[-0.2149,-0.4351],[-0.2042,-0.4436],[-0.1936,-0.4519],[-0.1826,-0.4595],[-0.1713,-0.4662],[-0.1601,-0.4717],[-0.1482,-0.4753],[-0.1351,-0.4781],[-0.1214,-0.4802],[-0.1083,-0.482],[-0.0949,-0.4836],[-0.0815,-0.4848],[-0.0678,-0.4842],[-0.0547,-0.4826],[-0.0419,-0.4799],[-0.0288,-0.4759],[-0.0148,-0.4726],[-0.0014,-0.4698],[0.0111,-0.4674],[0.0236,-0.4644],[0.0367,-0.461],[0.0489,-0.4574],[0.0623,-0.4534],[0.0742,-0.45],[0.087,-0.4464],[0.0988,-0.4433],[0.1107,-0.4409],[0.1217,-0.4379],[0.133,-0.4348],[0.1436,-0.4309],[0.154,-0.4266],[0.1646,-0.4211],[0.175,-0.4156],[0.1847,-0.4095],[0.1957,-0.4028],[0.2055,-0.3964],[0.2158,-0.3894],[0.2253,-0.3824],[0.2353,-0.3754],[0.2447,-0.3681],[0.2545,-0.3608],[0.2639,-0.3535],[0.2728,-0.3462],[0.2828,-0.3383],[0.2926,-0.3306],[0.3014,-0.3236],[0.3108,-0.3157],[0.3203,-0.3075],[0.3297,-0.2993],[0.3386,-0.2907],[0.3477,-0.2819],[0.3565,-0.2731],[0.3654,-0.2642],[0.3739,-0.2548],[0.3815,-0.2457],[0.3891,-0.2359],[0.3967,-0.2256],[0.4037,-0.2161],[0.4104,-0.2064],[0.4171,-0.196],[0.4232,-0.1857],[0.429,-0.1756],[0.4345,-0.1649],[0.44,-0.1537],[0.4449,-0.1427],[0.45,-0.1311],[0.4543,-0.1205],[0.4586,-0.1089],[0.4628,-0.0973],[0.4671,-0.0854],[0.4714,-0.0736],[0.4759,-0.0623],[0.4799,-0.0501],[0.4839,-0.0382],[0.4869,-0.0257],[0.4906,-0.0139],[0.4927,-0.0014],[0.4954,0.0111],[0.4973,0.023],[0.4982,0.0367],[0.4988,0.0489],[0.4994,0.062],[0.4994,0.0757],[0.4997,0.0897],[0.5,0.1031],[0.4997,0.1159],[0.4988,0.1296],[0.4979,0.1427],[0.496,0.1561],[0.4942,0.1701],[0.4924,0.1826],[0.4903,0.1969],[0.4872,0.2094],[0.4839,0.2231],[0.4799,0.2353],[0.4744,0.249],[0.4692,0.2612],[0.4631,0.2728],[0.4555,0.2834],[0.4476,0.2941],[0.4385,0.3032],[0.4284,0.3118],[0.4171,0.3188],[0.4044,0.3264],[0.3916,0.3322],[0.3776,0.3376],[0.3635,0.3407],[0.3492,0.3447],[0.3334,0.3474],[0.3191,0.3504],[0.3048,0.3538],[0.2913,0.3574],[0.2795,0.3629],[0.2682,0.3696],[0.2581,0.3766],[0.2481,0.3839],[0.2393,0.3922],[0.2301,0.4019],[0.2207,0.4114],[0.2131,0.4214],[0.2048,0.4312],[0.1963,0.4406],[0.1881,0.4497],[0.1783,0.4574],[0.1677,0.4641],[0.1567,0.4698],[0.1451,0.4753],[0.1336,0.4796],[0.1223,0.4823],[0.111,0.4842],[0.0991,0.4848],[0.0873,0.4842],[0.0757,0.482],[0.0632,0.4784],[0.0513,0.4735],[0.0401,0.4668],[0.0285,0.4589],[0.0175,0.45],[0.0059,0.4412],[-0.0053,0.4321],[-0.0163,0.4229],[-0.0267,0.4141],[-0.037,0.4062],[-0.0468,0.3989],[-0.0568,0.3922],[-0.0663,0.3867],[-0.0757,0.3815],[-0.0845,0.3772],[-0.0937,0.3727],[-0.1025,0.3681],[-0.111,0.3638],[-0.1193,0.3596],[-0.1275,0.3553],[-0.1351,0.3504],[-0.143,0.3453],[-0.15,0.3401],[-0.1579,0.3346],[-0.1665,0.3297],[-0.1753,0.3246],[-0.1838,0.3203],[-0.1927,0.3163],[-0.2024,0.3124],[-0.2118,0.3087],[-0.2219,0.3051],[-0.232,0.3014],[-0.2426,0.2981],[-0.2542,0.295],[-0.2658,0.292],[-0.277,0.2886],[-0.2883,0.285],[-0.3014,0.2813],[-0.3166,0.2783],[-0.3319,0.2755],[-0.3504,0.2737],[-0.3681,0.2722],[-0.3861,0.27],[-0.4028,0.2673],[-0.4187,0.2627],[-0.4336,0.2578],[-0.4476,0.2511],[-0.461,0.2447],[-0.4726,0.2362],[-0.4808,0.2265],[-0.4878,0.2152],[-0.4909,0.2018],[-0.4939,0.1884],[-0.4957,0.1741],[-0.4979,0.1604],[-0.4991,0.1464],[-0.4997,0.1323],[-0.5,0.1183],[-0.4997,0.1043],[-0.4985,0.0912],[-0.4973,0.0778],[-0.4954,0.0647],[-0.493,0.0516],[-0.4903,0.0382],[-0.4869,0.0251]],"sulci":{"central":[[0.0679,-0.0383],[0.0592,-0.0628],[0.05,-0.0873],[0.0393,-0.1114],[0.0275,-0.1349],[0.0159,-0.1587],[0.0074,-0.1834],[0.0014,-0.2089],[-0.0026,-0.2348],[-0.0097,-0.2601],[-0.0196,-0.2856],[-0.0336,-0.3116],[-0.0459,-0.3399],[-0.0564,-0.3697]],"sylvian":[[-0.1339,-0.0607],[-0.1116,-0.013],[-0.0596,0.0276],[0.0219,0.0568],[0.1364,0.083],[0.2248,0.1202],[0.2874,0.1728]],"sts":[[0.1019,0.3041],[0.0698,0.2757],[0.0381,0.2472],[0.0045,0.221],[-0.0306,0.1963],[-0.0676,0.1731],[-0.1019,0.147],[-0.1326,0.1187],[-0.1598,0.0881],[-0.1856,0.0557],[-0.2115,0.0202],[-0.2379,-0.018]]}};
  var brainOutline = BRAIN.outline;
  var brainSulci = [BRAIN.sulci.central, BRAIN.sulci.sylvian, BRAIN.sulci.sts];

  // Even resampling of the closed outline by arc length.
  function resampleClosed(pts, n) {
    var L = [0], total = 0;
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i], b = pts[(i + 1) % pts.length];
      total += Math.hypot(b[0] - a[0], b[1] - a[1]); L.push(total);
    }
    var out = [];
    for (var k = 0; k < n; k++) {
      var s = total * k / n, j = 0;
      while (j < pts.length - 1 && L[j + 1] < s) j++;
      var a2 = pts[j], b2 = pts[(j + 1) % pts.length];
      var t = (s - L[j]) / ((L[j + 1] - L[j]) || 1);
      out.push([a2[0] + (b2[0] - a2[0]) * t, a2[1] + (b2[1] - a2[1]) * t]);
    }
    return out;
  }
  function resampleOpen(pts, n) {
    var L = [0], total = 0;
    for (var i = 0; i < pts.length - 1; i++) {
      total += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); L.push(total);
    }
    var out = [];
    for (var k = 0; k < n; k++) {
      var s = total * k / (n - 1), j = 0;
      while (j < pts.length - 2 && L[j + 1] < s) j++;
      var a = pts[j], b = pts[j + 1];
      var t = (s - L[j]) / ((L[j + 1] - L[j]) || 1);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
    return out;
  }

  // Particle budget for the brain: outline, three sulci, cerebellum, stem.
  var nOutline = Math.round(particleCount * 0.58);
  var nSulci = [12, 8, 10];
  var nCereb = 18;
  var nStem = particleCount - nOutline - nSulci[0] - nSulci[1] - nSulci[2] - nCereb;
  var brainTargets = [];                 // [x, y] in outline units, plus group id
  var brainGroups = [];                  // segment list for connections
  (function () {
    var o = resampleClosed(brainOutline, nOutline);
    var start = brainTargets.length;
    o.forEach(function (p) { brainTargets.push(p); });
    brainGroups.push({ start: start, n: nOutline, closed: true });
    for (var s = 0; s < 3; s++) {
      var pts = resampleOpen(brainSulci[s], nSulci[s]);
      var st = brainTargets.length;
      pts.forEach(function (p) { brainTargets.push(p); });
      brainGroups.push({ start: st, n: nSulci[s], closed: false });
    }
    // Cerebellum: three stacked arcs tucked under the occipital lobe.
    // Locate the occipital-inferior corner of the outline (min x, y > 0).
    // Occipital pole is the leftmost outline point; the cerebellum sits just
    // below the outline's lower edge a little anterior of it.
    var ox = 1;
    brainOutline.forEach(function (p) { if (p[0] < ox) ox = p[0]; });
    var cx = ox + 0.2, bottom = -1;
    brainOutline.forEach(function (p) { if (Math.abs(p[0] - cx) < 0.12 && p[1] > bottom) bottom = p[1]; });
    var cy = bottom + 0.035;
    var layers = 3, per = Math.floor(nCereb / layers);
    for (var l = 0; l < layers; l++) {
      var st2 = brainTargets.length;
      for (var i = 0; i < per; i++) {
        var t = i / (per - 1);
        brainTargets.push([cx + (t - 0.5) * 0.22, cy + l * 0.03 + Math.sin(t * Math.PI) * 0.04]);
      }
      brainGroups.push({ start: st2, n: per, closed: false });
    }
    // Brainstem: short line dropping from beneath the temporal lobe root.
    var st3 = brainTargets.length;
    for (var k = 0; k < nStem; k++) {
      brainTargets.push([cx + 0.17, cy + 0.02 + k * 0.02]);
    }
    brainGroups.push({ start: st3, n: nStem, closed: false });
  })();

  function getBrainPosition(index, total, centerX, centerY) {
    var size = Math.min(W() * 0.8, H() * 0.8, 320);
    var p = brainTargets[Math.min(index, brainTargets.length - 1)];
    return { x: centerX + p[0] * size, y: centerY - 18 + p[1] * size };
  }

  function getEyePosition(index, total, centerX, centerY) {
    const eyeWidth = Math.min(W() * 0.7, 220);
    const eyeHeight = Math.min(H() * 0.35, 90);
    
    if (index < total * 0.4) {
      // Upper eyelid
      const t = index / (total * 0.4);
      const angle = Math.PI * t;
      const x = centerX - eyeWidth/2 + eyeWidth * t;
      const y = centerY - Math.sin(angle) * eyeHeight/2;
      return { x, y };
    } else if (index < total * 0.8) {
      // Lower eyelid
      const t = (index - total * 0.4) / (total * 0.4);
      const angle = Math.PI * t;
      const x = centerX + eyeWidth/2 - eyeWidth * t;
      const y = centerY + Math.sin(angle) * eyeHeight/2;
      return { x, y };
    } else if (index < total * 0.95) {
      // Iris
      const irisIndex = index - total * 0.8;
      const irisTotal = total * 0.15;
      const angle = (irisIndex / irisTotal) * Math.PI * 2;
      const irisRadius = eyeHeight / 3;
      const x = centerX + Math.cos(angle) * irisRadius;
      const y = centerY + Math.sin(angle) * irisRadius;
      return { x, y };
    } else {
      // Pupil
      const pupilIndex = index - total * 0.95;
      const pupilTotal = total * 0.05;
      const angle = (pupilIndex / pupilTotal) * Math.PI * 2;
      const pupilRadius = eyeHeight / 8;
      const x = centerX + Math.cos(angle) * pupilRadius;
      const y = centerY + Math.sin(angle) * pupilRadius;
      return { x, y };
    }
  }

  function getNeuralNetworkPosition(index, total, centerX, centerY) {
    const networkWidth = Math.min(W() * 0.8, 240);
    const maxLayerHeight = Math.min(H() * 0.525, 187.5); // 0.7 * 0.75 = 0.525
    
    // Define layer sizes: input (8), hidden1 (16), hidden2 (16), hidden3 (16), output (4)
    const inputSize = 8;
    const hiddenSize = inputSize * 2; // 16
    const outputSize = Math.floor(inputSize * 0.5); // 4
    const layers = [inputSize, hiddenSize, hiddenSize, hiddenSize, outputSize]; // 5 layers total
    const totalNodes = layers.reduce((a, b) => a + b, 0);
    
    // Find which layer this particle belongs to
    let currentIndex = 0;
    let layerIndex = 0;
    let nodeInLayer = 0;
    
    for (let i = 0; i < layers.length; i++) {
      const layerSize = Math.floor(layers[i] * (total / totalNodes));
      if (index < currentIndex + layerSize) {
        layerIndex = i;
        nodeInLayer = index - currentIndex;
        break;
      }
      currentIndex += layerSize;
    }
    
    // Calculate horizontal position (4 layers evenly spaced)
    const x = centerX - networkWidth/2 + layerIndex * (networkWidth / (layers.length - 1));
    
    // Calculate vertical position based on layer size
    const layerSize = Math.floor(layers[layerIndex] * (total / totalNodes));
    const maxLayer = Math.max(...layers);
    const layerHeight = (layers[layerIndex] / maxLayer) * maxLayerHeight;
    
    // Adjusted spacing between nodes for reduced height
    const nodeSpacing = (layerHeight * 1.5) / (layerSize - 1 || 1); // Reduced from 2 to 1.5
    const totalHeight = nodeSpacing * (layerSize - 1);
    const y = centerY - totalHeight/2 + nodeInLayer * nodeSpacing;
    
    return { x, y };
  }

  function getFormationPosition(index, total, formationType) {
    var centerX = W() / 2, centerY = H() / 2;
    switch (formationType) {
      case 0: return getEyePosition(index, total, centerX, centerY);
      case 1: return getBrainPosition(index, total, centerX, centerY);
      case 2: return getNeuralNetworkPosition(index, total, centerX, centerY);
      default: return { x: centerX, y: centerY };
    }
  }

  var maxTrailLength = 20;
  function Particle() {
    this.x = Math.random() * W(); this.y = Math.random() * H();
    this.targetX = this.x; this.targetY = this.y;
    this.currentX = this.x; this.currentY = this.y;
    this.prevX = this.x; this.prevY = this.y;
    this.radius = particleRadius; this.color = particleColor;
    this.vx = 0; this.vy = 0; this.trail = [];
  }
  Particle.prototype.startDiffusion = function () {
    var cx = W() / 2, cy = H() / 2;
    var dx = this.x - cx, dy = this.y - cy;
    var d = Math.sqrt(dx * dx + dy * dy) || 1;
    var speed = 3 + Math.random() * 2;
    this.vx = dx / d * speed; this.vy = dy / d * speed;
  };
  Particle.prototype.updateFormationPosition = function (index, formationType) {
    var pos = getFormationPosition(index, particleCount, formationType);
    this.targetX = pos.x; this.targetY = pos.y;
  };
  Particle.prototype.update = function (useFormation, speed) {
    this.prevX = this.x; this.prevY = this.y;
    if (useFormation) {
      this.currentX += (this.targetX - this.currentX) * speed;
      this.currentY += (this.targetY - this.currentY) * speed;
    } else {
      this.vx *= 0.995; this.vy *= 0.995;
      this.currentX += this.vx; this.currentY += this.vy;
      var damp = 0.7, w = W(), h = H();
      if (this.currentX - this.radius <= 0 && this.vx < 0) { this.vx = Math.abs(this.vx) * damp; this.currentX = this.radius; }
      else if (this.currentX + this.radius >= w && this.vx > 0) { this.vx = -Math.abs(this.vx) * damp; this.currentX = w - this.radius; }
      if (this.currentY - this.radius <= 0 && this.vy < 0) { this.vy = Math.abs(this.vy) * damp; this.currentY = this.radius; }
      else if (this.currentY + this.radius >= h && this.vy > 0) { this.vy = -Math.abs(this.vy) * damp; this.currentY = h - this.radius; }
    }
    this.x = this.currentX; this.y = this.currentY;
    var dx = this.x - this.prevX, dy = this.y - this.prevY;
    if (Math.sqrt(dx * dx + dy * dy) > 0.5) {
      this.trail.push({ x: this.prevX, y: this.prevY, opacity: 1 });
      if (this.trail.length > maxTrailLength) this.trail.shift();
    }
    this.trail.forEach(function (p) { p.opacity *= 0.975; });
    this.trail = this.trail.filter(function (p) { return p.opacity > 0.01; });
  };
  Particle.prototype.draw = function () {
    var g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
    g.addColorStop(0, 'rgba(31, 79, 154, 0.3)');
    g.addColorStop(0.5, 'rgba(31, 79, 154, 0.1)');
    g.addColorStop(1, 'rgba(31, 79, 154, 0)');
    ctx.beginPath(); ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill();
  };
  Particle.prototype.drawTrail = function () {
    if (this.trail.length < 2) return;
    ctx.lineWidth = 0.5;
    for (var i = 1; i < this.trail.length; i++) {
      var p1 = this.trail[i - 1], p2 = this.trail[i];
      ctx.strokeStyle = 'rgba(180, 180, 180, ' + (p2.opacity * 0.3) + ')';
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    }
    var last = this.trail[this.trail.length - 1];
    ctx.strokeStyle = 'rgba(180, 180, 180, ' + (last.opacity * 0.3) + ')';
    ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(this.x, this.y); ctx.stroke();
  };

  for (var i = 0; i < particleCount; i++) particles.push(new Particle());

  function drawBrainConnections() {
    ctx.lineWidth = 0.9;
    brainGroups.forEach(function (gp, gi) {
      ctx.strokeStyle = 'rgba(90, 100, 120, ' + ((gi === 0 ? 0.35 : 0.3) * transitionProgress) + ')';
      ctx.beginPath();
      for (var i = 0; i < gp.n; i++) {
        var p = particles[gp.start + i];
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      if (gp.closed) ctx.closePath();
      ctx.stroke();
    });
  }
  function drawProximityConnections() {
    var connectionDistance = 20;
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < Math.min(i + 10, particles.length); j++) {
        var dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < connectionDistance) {
          ctx.strokeStyle = 'rgba(150, 150, 150, ' + ((1 - d / connectionDistance) * 0.3 * transitionProgress) + ')';
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
        }
      }
    }
  }
  function drawNeuralConnections() {
    // Neural network connections for 5 layers (input + 3 hidden + output)
    const inputSize = 8;
    const hiddenSize = inputSize * 2; // 16
    const outputSize = Math.floor(inputSize * 0.5); // 4
    const layers = [inputSize, hiddenSize, hiddenSize, hiddenSize, outputSize]; // 5 layers
    const totalNodes = layers.reduce((a, b) => a + b, 0);
    const sparsity = 0.25; // Connection probability
    
    let nodeIndex = 0;
    
    // Set random seed for consistent connections
    let seed = 12345;
    function seededRandom() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }
    
    for (let layer = 0; layer < layers.length - 1; layer++) {
      const currentLayerSize = layers[layer];
      const nextLayerSize = layers[layer + 1];
      const nodesPerLayer = particleCount / totalNodes;
      
      // Connect all nodes between layers with sparsity
      for (let i = 0; i < currentLayerSize * nodesPerLayer; i++) {
        for (let j = 0; j < nextLayerSize * nodesPerLayer; j++) {
          // Only draw connection with probability = sparsity
          if (seededRandom() < sparsity) {
            const p1Index = Math.floor(nodeIndex + i);
            const p2Index = Math.floor(nodeIndex + currentLayerSize * nodesPerLayer + j);
            
            if (p1Index < particles.length && p2Index < particles.length) {
              const p1 = particles[p1Index];
              const p2 = particles[p2Index];
              
              // Even darker gray connections (3x darker than original)
              ctx.strokeStyle = `rgba(60, 60, 60, ${0.4 * transitionProgress})`;
              ctx.lineWidth = 0.1;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
      nodeIndex += currentLayerSize * nodesPerLayer;
    }
  }

  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(container);
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!visible) return;
    ctx.clearRect(0, 0, W(), H());
    phaseTimer++;
    switch (animationPhase) {
      case 0:
        if (phaseTimer > 70) {
          animationPhase = 1; phaseTimer = 0; transitionProgress = 0;
          particles.forEach(function (p, i) { p.updateFormationPosition(i, currentFormation); });
        }
        particles.forEach(function (p) { p.update(false, 0.02); });
        break;
      case 1:
        transitionProgress += 0.015;
        if (transitionProgress >= 1) { animationPhase = 2; phaseTimer = 0; transitionProgress = 1; }
        particles.forEach(function (p) { p.update(true, 0.08); });
        break;
      case 2:
        if (phaseTimer > (reduceMotion ? 100000 : 150)) {
          animationPhase = 3; phaseTimer = 0;
          particles.forEach(function (p) { p.startDiffusion(); });
        }
        particles.forEach(function (p) { p.update(true, 0.1); });
        break;
      case 3:
        transitionProgress -= 0.02;
        if (transitionProgress <= 0) {
          animationPhase = 0; phaseTimer = 0; transitionProgress = 0;
          currentFormation = (currentFormation + 1) % 3;
        }
        particles.forEach(function (p) { p.update(false, 0.03); });
        break;
    }
    particles.forEach(function (p) { p.drawTrail(); });
    if ((animationPhase === 1 || animationPhase === 2) && transitionProgress > 0.3) {
      ctx.lineWidth = 0.5;
      if (currentFormation === 2) drawNeuralConnections();
      else if (currentFormation === 1) drawBrainConnections();
      else drawProximityConnections();
    }
    particles.forEach(function (p) { p.draw(); });
  }
  animate();
})();
