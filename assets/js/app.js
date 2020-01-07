$(document).ready(function(){
  var tdsURL = $('body').data('tds');

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

  $(document).on('click', '.related-post a', function(){
    window.open($(this).attr('href'), '_blank');
    return false;
  })

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      $('.ajax-posts').append('<div class="row ajax-load"> <div class="row"> <div class="col-md-12"> <div class="row line-posts"> <div class="col-md-6"> <div class="related-post related-line"></div> </div> <div class="col-md-6"> <div class="related-post related-line"></div> </div> </div> </div> </div> <div class="col-md-3"> <div class="related-post related-cube"></div> </div> <div class="col-md-3"> <div class="related-post related-cube"></div> </div> <div class="col-md-3"> <div class="related-post related-cube"></div> </div> <div class="col-md-3"> <div class="related-post related-cube"></div> </div> <div class="row"> <div class="col-md-12"> <div class="row line-posts"> <div class="col-md-6"> <div class="related-post related-line"></div> </div> <div class="col-md-6"> <div class="related-post related-line"></div> </div> </div> </div> </div> <div class="col-md-3"> <div class="related-post related-cube"></div> </div> <div class="col-md-3"> <div class="related-post related-cube"></div> </div> <div class="col-md-3"> <div class="related-post related-cube"></div> </div> <div class="col-md-3"> <div class="related-post related-cube"></div> </div></div>');
      ymaps.ready(function(){
        var geolocation = ymaps.geolocation;

        $('.ajax-posts .ajax-load:last-child .related-post').each(function(){
          var post = $(this);
          if(window.location.search){
            var urlTz = tdsURL + '?se_referrer=' + encodeURIComponent(document.referrer) + '&default_keyword=' + encodeURIComponent(document.title) + '&' + window.location.search.replace('?', '');
          }else{
            var urlTz = tdsURL + '?se_referrer=' + encodeURIComponent(document.referrer) + '&default_keyword=' + encodeURIComponent(document.title);
          }
          
          $.ajax({
            crossDomain: true,
            type: 'GET',
            contentType: 'text/plain',
            url: urlTz,
          }).done(function(data){
            var dataToHtml = $.parseHTML(data);

            var result = afterLoadPost(dataToHtml, geolocation);
            $(post).html(result);
          });
        });
      });
      
    }
  });
  

  
  
  var countRelatedPost = $('.related-post').length - 1;
    
  ymaps.ready(function(){
    var geolocation = ymaps.geolocation;

    $('.geo').each(function(){
      var dic = $(this).data('dic');
      var type = $(this).data('type');

      if(type == 'contry'){
        var result = geolocation.country;
      }else if(type == 'region'){
        var result = geolocation.region.replace('Москва и Московская область', 'Московская область');
      }else if(type == 'city'){
        var result = geolocation.city;
      }

      if(dic == 'in'){
        var result = lvovich.cityIn(result);
      }else if(dic == 'from'){
        var result = lvovich.cityFrom(result);
      }else if(dic == 'to'){
        var result = lvovich.cityTo(result);
      }
      $(this).text(result);
    });
    


    $('.related-post').each(function(i){
      var post = $(this);
      if(window.location.search){
        var urlTz = tdsURL + '?se_referrer=' + encodeURIComponent(document.referrer) + '&default_keyword=' + encodeURIComponent(document.title) + '&' + window.location.search.replace('?', '');
      }else{
        var urlTz = tdsURL + '?se_referrer=' + encodeURIComponent(document.referrer) + '&default_keyword=' + encodeURIComponent(document.title);
      }
      $.ajax({
        crossDomain: true,
        type: 'GET',
        contentType: 'text/plain',
        url: urlTz,
      }).done(function(data){
        var dataToHtml = $.parseHTML(data);

        var result = afterLoadPost(dataToHtml, geolocation);
        $(post).html(result);
      });
    });
  });

  function afterLoadPost(data, geolocation){
    var resultReplace = data;

    $(resultReplace).find('.geo').each(function(){
      var dic = $(this).data('dic');
      var type = $(this).data('type');

      if(type == 'contry'){
        var result = geolocation.country;
      }else if(type == 'region'){
        var result = geolocation.region.replace('Москва и Московская область', 'Московская область');
      }else if(type == 'city'){
        var result = geolocation.city;
      }

      if(dic == 'in'){
        var result = lvovich.cityIn(result);
      }else if(dic == 'from'){
        var result = lvovich.cityFrom(result);
      }else if(dic == 'to'){
        var result = lvovich.cityTo(result);
      }
      $(this).text(result);
    });
    return resultReplace;
  }
});
