$(document).ready(function(){
  if($('#sidebar').length){
    var a = new StickySidebar('#sidebar', {
      topSpacing: 0,
      bottomSpacing: 0,
      containerSelector: '.article-container',
      minWidth: 770
    });
  }

  var appendNull = function (num) {return num < 10 ? 0 + num.toString() : num};
  $('.date').each(function(){
    var change = parseInt($(this).data('change'));
    var date = new Date(new Date().getTime() + change * 86400000);
    var month = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
    $(this).text(appendNull(date.getDate()) + ' ' + month[date.getMonth()] + ' ' + date.getFullYear());
  });
});
