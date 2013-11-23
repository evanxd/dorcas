define(function() {
  var markdownHelper = {
    /**
     * Get the page number of markdown content.
     *
     * @method pageNumber.
     * @param {String} content the markdown content.
     */
    pageNumber: function(content) {
      const MARKDOWN_PAGE_LINE = '---';
      return content
               .replace(/^\s+|\s+$/g, '')
               .split(MARKDOWN_PAGE_LINE).length;
    }
  };
  return markdownHelper;
});
