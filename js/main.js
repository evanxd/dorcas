require(['lib/domReady', 'lib/markdown_helper', 'lib/input_event_trigger'],
  function(domReady, markdownHelper, liveReload) {
  var editorTextarea,
      switchMode,
      preview,
      previewIframe,
      editor;

  domReady(function() {
    editorTextarea = document.querySelector('#editorTextarea');
    switchMode = document.querySelector('#switchMode');
    preview = document.querySelector('#preview');
    previewIframe = document.querySelector('#previewIframe');
    editor = document.querySelector('#editor');

    updateSlide();
    updateSwitchModeButton();
    liveReload(editorTextarea, updateSlide);

    switchMode.addEventListener('click', function() {
      editor.classList.toggle('hidden');
      preview.classList.toggle('fullscreen');

      if (preview.classList.contains('fullscreen')) {
        previewIframe.focus();
      } else {
        editorTextarea.focus();
      }
      updateSwitchModeButton();
    });
  });

  function updateSlide() {
    var previewWindow = previewIframe.contentWindow,
        editorText = editorTextarea.value,
        editingContent = '',
        page = 0;

    editingContent = editorText.substring(0, editorTextarea.selectionStart);
    page = markdownHelper.pageNumber(editingContent);

    previewWindow.postMessage(
      {
        content: editorText,
        page: page
      },
      location.origin
    );
  }

  function updateSwitchModeButton() {
    if (preview.classList.contains('fullscreen')) {
      switchMode.innerHTML = 'edit';
    } else {
      switchMode.innerHTML = 'demo';
    }
  }
});
