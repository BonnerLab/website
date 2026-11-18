// Teaser clips (<video data-teaser>): the poster is the first frame; a clip plays once when it
// scrolls into view (clips arriving together start in turn), replays on hover or tap, and stops
// on its last frame. With reduced motion it does not play and rests on the finished diagram.
document.addEventListener('DOMContentLoaded', function () {
  var clips = document.querySelectorAll('video[data-teaser]');
  if (!clips.length) return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nextStart = 0;
  clips.forEach(function (video) {
    function play() {
      if (!(video.paused || video.ended)) return;
      try { video.currentTime = 0; } catch (e) {}
      var started = video.play();
      if (started && started.catch) started.catch(function () {}); // autoplay refused: the poster stays
    }
    video.muted = true;
    if (reduceMotion) {
      var rest = function () { video.currentTime = Math.max(0, video.duration - 0.05); };
      if (video.readyState >= 1) rest(); else video.addEventListener('loadedmetadata', rest, { once: true });
      return;
    }
    if (video.closest('[data-scroller]')) return;   // the home page slideshow plays its own clips (js/scroller.js)
    if ('IntersectionObserver' in window) {
      var seen = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        seen.disconnect();
        var now = performance.now(), at = Math.max(now + 250, nextStart + 450);
        nextStart = at;
        setTimeout(play, at - now);
      }, { threshold: 0.45 });
      seen.observe(video);
    }
    var card = video.closest('.featured-item, .recent-card, .project') || video;
    card.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') play(); });
    if (!video.closest('a')) video.addEventListener('click', play);
  });
});
