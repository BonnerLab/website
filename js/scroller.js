// Featured Work on the home page ([data-scroller]): a native scrolling track ([data-scroll-track])
// of papers ([data-scroll-item]), each with a teaser clip, shown as a slideshow.
//  - One paper is the current one. Its clip plays; when the clip ends the next paper becomes
//    current (after the last, the first again). This starts when the panel scrolls into view and
//    waits while the pointer is over the panel, keyboard focus is inside it, or it is off screen.
//  - The previous/next buttons (which go round from the last paper to the first), the arrow keys (with the track focused), the markers under the
//    panel ([data-scroll-dots], built here: one per paper, the current one filling as its clip
//    plays) and swiping all change the current paper.
//  - Papers less than 60% in view get the class is-aside.
// With reduced motion nothing plays or advances by itself (js/teasers.js rests the clips on their
// last frame); the buttons, keys and markers still work.
document.addEventListener('DOMContentLoaded', function () {
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DWELL = 1800;   // ms the finished diagram stays before the next paper
  var RESUME = 700;   // ms after the pointer or focus leaves before moving on

  document.querySelectorAll('[data-scroller]').forEach(function (root) {
    var track = root.querySelector('[data-scroll-track]');
    var prev = root.querySelector('[data-scroll-prev]');
    var next = root.querySelector('[data-scroll-next]');
    if (!track || !prev || !next) return;
    var items = Array.prototype.slice.call(track.querySelectorAll('[data-scroll-item]'));
    if (!items.length) return;
    var stage = track.parentNode;
    var dotsBox = root.querySelector('[data-scroll-dots]');
    var dots = [];
    var n = items.length;
    root.classList.add('is-live');
    var cur = 0;            // the current paper
    var playing = -1;       // the paper whose clip was last started
    var inView = false, held = false, waiting = false;
    var timer = 0, settleTimer = 0, raf = 0, moving = false;

    function video(i) { return items[i].querySelector('video'); }
    function padL() { return parseFloat(getComputedStyle(track).paddingLeft) || 0; }
    function max() { return track.scrollWidth - track.clientWidth; }
    // scroll position that puts paper i at the start of the track
    function posOf(i) {
      var origin = track.getBoundingClientRect().left + padL() - track.scrollLeft;
      return Math.max(0, Math.min(max(), items[i].getBoundingClientRect().left - origin));
    }
    function wholly(i) {
      var b = track.getBoundingClientRect(), r = items[i].getBoundingClientRect();
      return r.left >= b.left - 2 && r.right <= b.right + 2;
    }
    function lead() {
      var best = 0, d = Infinity;
      for (var i = 0; i < n; i++) {
        var x = Math.abs(posOf(i) - track.scrollLeft);
        if (x < d - 1) { d = x; best = i; }
      }
      return best;
    }

    if (dotsBox) {
      items.forEach(function (item, i) {
        var b = document.createElement('button');
        var title = item.querySelector('[data-scroll-title]');
        b.type = 'button';
        b.className = 'scroller-dot';
        b.setAttribute('aria-label', 'Paper ' + (i + 1) + ' of ' + n + (title ? ': ' + title.textContent.trim() : ''));
        b.appendChild(document.createElement('span'));
        b.addEventListener('click', function () { go(i); });
        dotsBox.appendChild(b);
        dots.push(b);
      });
    }

    function mark() {
      var box = track.getBoundingClientRect();
      items.forEach(function (el, i) {
        var r = el.getBoundingClientRect();
        var shown = Math.min(r.right, box.right) - Math.max(r.left, box.left);
        el.classList.toggle('is-aside', r.width > 0 && shown / r.width < 0.6);
        el.classList.toggle('is-current', i === cur);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-current', i === cur);
        if (i === cur) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    }
    function fill(p) { if (dots[cur]) dots[cur].firstChild.style.transform = 'scaleX(' + p.toFixed(4) + ')'; }
    function tick() {
      var v = video(cur);
      if (v && v.duration) fill(Math.min(1, v.currentTime / v.duration));
      raf = v && !v.paused && !v.ended ? requestAnimationFrame(tick) : 0;
    }

    // Start the current paper's clip from its first frame (once per time it becomes current).
    function start() {
      if (still || !inView || playing === cur) return;
      var v = video(cur);
      playing = cur;
      waiting = false;
      clearTimeout(timer);
      items.forEach(function (el, i) { var o = video(i); if (o && i !== cur && !o.paused) o.pause(); });
      if (!v) { queue(DWELL * 2); return; }
      try { v.currentTime = 0; } catch (e) {}
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }
    function queue(ms) {
      clearTimeout(timer);
      if (still) return;
      if (held || !inView) { waiting = true; return; }
      waiting = false;
      timer = setTimeout(function () { go((cur + 1) % n, true); }, ms);
    }
    function settle() {
      moving = false;
      // after a swipe, the paper at the start of the track is the current one
      if (!wholly(cur)) cur = lead();
      mark();
      if (playing !== cur) { dots.forEach(function (d) { d.firstChild.style.transform = ''; }); start(); }
    }
    function go(i, auto) {
      i = ((i % n) + n) % n;                        // past either end: round to the other
      clearTimeout(timer);
      waiting = false;
      var same = i === cur;
      cur = i;
      if (same) playing = -1;                       // asked for again: replay
      dots.forEach(function (d) { d.firstChild.style.transform = ''; });
      mark();
      var to = posOf(i);
      if (wholly(i) || Math.abs(to - track.scrollLeft) < 2) { start(); return; }
      moving = true;
      if (!still && Math.abs(to - track.scrollLeft) > 2.5 * track.clientWidth) {
        // a long way (the last paper back to the first, say): a quick fade instead of a ride past the others
        track.classList.add('is-turning');
        setTimeout(function () {
          track.scrollTo({ left: to, behavior: 'auto' });
          track.classList.remove('is-turning');
          settle();
        }, 220);
        return;
      }
      track.scrollTo({ left: to, behavior: still ? 'auto' : 'smooth' });
    }

    items.forEach(function (item, i) {
      var v = video(i);
      if (!v) return;
      v.muted = true;
      v.addEventListener('ended', function () { if (i === cur) { fill(1); queue(DWELL); } });
    });

    prev.addEventListener('click', function () { go(cur - 1); });
    next.addEventListener('click', function () { go(cur + 1); });
    track.addEventListener('keydown', function (e) {
      if (e.target !== track || e.altKey || e.ctrlKey || e.metaKey) return;
      var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      go(cur + dir);
    });
    // A paper reached with the keyboard becomes the current one.
    track.addEventListener('focusin', function (e) {
      if (e.target === track) return;
      try { if (!e.target.matches(':focus-visible')) return; } catch (err) { return; }
      for (var i = 0; i < n; i++) if (items[i].contains(e.target) && i !== cur) { go(i); return; }
    });
    track.addEventListener('scroll', function () {
      mark();
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 140);
    }, { passive: true });

    function hold(on) {
      held = on;
      if (!on && waiting) queue(RESUME);
    }
    function refreshHold() { hold(stage.matches(':hover') || !!root.querySelector(':focus-visible')); }
    stage.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') hold(true); });
    stage.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') refreshHold(); });
    root.addEventListener('focusin', refreshHold);
    root.addEventListener('focusout', function () { setTimeout(refreshHold, 0); });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (!inView) return;
        if (playing !== cur) start();
        else if (waiting) queue(RESUME);
      }, { threshold: 0.5 }).observe(stage);
    } else {
      inView = true;
      start();
    }

    window.addEventListener('resize', mark);
    window.addEventListener('load', mark);
    mark();
  });
});
