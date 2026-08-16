
(function () {
  var wrapper = document.querySelector('[data-testid="slidesWrapper"]');
  if (!wrapper) return;
  var slides = Array.prototype.slice.call(wrapper.children);
  var dots = Array.prototype.slice.call(document.querySelectorAll('nav[aria-label="Slides"] ol li'));
  var current = 0, timer = null;
  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, j) { s.classList.toggle('hypr-active', j === current); });
    dots.forEach(function (li, j) {
      var a = li.querySelector('a');
      if (j === current) { li.setAttribute('aria-current', 'true'); a.classList.add('JPnvZO'); }
      else { li.removeAttribute('aria-current'); a.classList.remove('JPnvZO'); }
    });
  }
  function restart() { clearInterval(timer); timer = setInterval(function () { show(current + 1); }, 6000); }
  document.querySelector('[data-testid="prevButton"]').addEventListener('click', function () { show(current - 1); restart(); });
  document.querySelector('[data-testid="nextButton"]').addEventListener('click', function () { show(current + 1); restart(); });
  dots.forEach(function (li, j) {
    li.querySelector('a').addEventListener('click', function (e) { e.preventDefault(); show(j); restart(); });
  });
  show(0); restart();
})();
