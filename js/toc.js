// https://github.com/ghiculescu/jekyll-table-of-contents
$(document).ready(function() {
  var no_back_to_top_links = true;

  var headers = $('h1, h2, h3, h4, h5, h6').filter(function() {return this.id}), // get all headers with an ID
      output = $('.toc');
  output.hide();
  if (!headers.length || headers.length < 3 || !output.length)
    return;

  var get_level = function(ele) { return parseInt(ele.nodeName.replace("H", ""), 10) }
  var highest_level = headers.map(function(_, ele) { return get_level(ele) }).get().sort()[0]
  var return_to_top = '<i class="icon-arrow-up back-to-top"> </i>'

  var level = get_level(headers[0]), this_level, html = "<i>Jump to...</i><ol>";
  headers.on('click', function() {
    if (!no_back_to_top_links) window.location.hash = this.id
  }).addClass('clickable-header').each(function(_, header) {
    this_level = get_level(header);
    if (!no_back_to_top_links && this_level === highest_level) {
      $(header).addClass('top-level-header').after(return_to_top)
    }
    var headerText = $(header).text();
    if (this_level === level) // same level as before; same indenting
      html += "<li><a href='#" + header.id + "'>" + headerText + "</a>";
    else if (this_level < level) // higher level than before; end parent ol
      html += "</li></ol></li><li><a href='#" + header.id + "'>" + headerText + "</a>";
    else if (this_level > level) // lower level than before; expand the previous to contain a ol
      html += "<ol><li><a href='#" + header.id + "'>" + headerText + "</a>";
    level = this_level; // update for the next one
  });
  html += "</ol>";
  if (!no_back_to_top_links) {
    $(document).on('click', '.back-to-top', function() {
      $(window).scrollTop(0)
      window.location.hash = ''
    })
  }
  if (html != '<i>Jump to...</i><ol></ol>') {
      output.html(html).show(0);
  }
});