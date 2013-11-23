require(['lib/domReady', 'lib/slide_render'],
  function(domReady, slideRender) {
  domReady(function() {
    slideRender.render();
    window.addEventListener('message', function(event) {
      var data = event.data;
      // TODO: Render the slide in specified page number, not all.
      slideRender.render(data.content, data.page);
      // Go to the page edited by user currently.
      slideRender.showSlide(data.page);
    });
  });
});
