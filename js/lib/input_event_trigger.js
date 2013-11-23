define(function() {
  return inputEventTrigger;
  /**
   * Set inteval time for the trigger of input event.
   * So the input event will NOT be triggered by each input.
   *
   * @param {Object} inputElement a textarea element instance.
   * @param {Object} options setup the trigger.
   * @param {Function} callback do the function once the trigger is triggered.
   */
  function inputEventTrigger(inputElement, options, callback) {
    const DEFAULT_INTERVAL = 400;
    var prevUpdateSlideTime = new Date().getTime(),
        lastKeyupTime,
        updateSlideTimer,
        postMessageInterval;

    if (typeof(options) === 'function') {
      callback = options;
      postMessageInterval = DEFAULT_INTERVAL;
    } else {
      postMessageInterval =
        options.postMessageInterval || DEFAULT_INTERVAL;
    }

    inputElement.addEventListener('input', function(event) {
      var now = new Date().getTime();

      if (now - prevUpdateSlideTime > postMessageInterval) {
        callback();
        prevUpdateSlideTime = now;
      }
    });

    inputElement.addEventListener('keydown', function(event) {
      if (!updateSlideTimer) {
        updateSlideTimer = setInterval(function() {
          var now = new Date().getTime();

          if ((now - lastKeyupTime) > postMessageInterval) {
            callback();
            clearInterval(updateSlideTimer);
            updateSlideTimer = undefined;
          }
        }, postMessageInterval);
      }
    });

    inputElement.addEventListener('keyup', function(event) {
      lastKeyupTime = new Date().getTime();
    });
  }
});
