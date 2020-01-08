// filters:  getQuery('cost') != '[BID]' &&
//           getQuery('cost') != '0' &&
//           getQuery('cost') != '[PRICE]',

var tzrsAll = [
  {
    enable: true,
    filters: true,
    list: [
      {
        img: 'ketodiet1.jpg',
        text: 'Смертельная ловушка! Врачи прогнозировали ей смерть через 2 года. Диета от диабета: 1 чайна ложка...',
        link: 'https://loopmario.xyz/cr7fgP'
      },
      {
        img: 'ketodiet2.jpg',
        text: 'Личное интервью: как я убрала жирные ляшки и стала мисс <span class="geo" data-type="region"></span>',
        link: 'https://loopmario.xyz/cr7fgP'
      },
      {
        img: 'ketodiet3.jpg',
        text: 'Врач из <span class="geo" data-type="city" data-dic="from"></span> рассказал рецепт похудения СССР. Рецепт: взболтать яичный белок и смешать с...',
        link: 'https://loopmario.xyz/cr7fgP'
      },
      {
        img: 'ketodiet4.jpg',
        text: 'Рецепт экстремального похудения от врача КГБ. Записывайте рецепт: 1 ложка меда, два зубчика...',
        link: 'https://loopmario.xyz/cr7fgP'
      },
      {
        img: 'ketodiet5.jpg',
        text: 'Женщина из <span class="geo" data-type="city" data-dic="from"></span> повергла в шок все СМИ. Как удалось похудеть Нине и что из нее вышло...',
        link: 'https://loopmario.xyz/cr7fgP'
      },
    ]
  },
  {
    filters:  getQuery('cost') != '[BID]' &&
              getQuery('cost') != '0' && 
              getQuery('cost') != '[PRICE]',
    enable: true,
    list: [
      {
        img: 'vnds1.jpg',
        text: 'Банкоматы <span class="geo" data-type="region" data-dic="from"></span> пустеют. Люди активно выводят положенные им компенсации и выплаты...',
        link: 'https://loopmario.xyz/J563Qz'
      },
      {
        img: 'vnds2.jpg',
        text: 'Министерство подтвердило ситуацию с выплатами и компенсациями. Они действительно доступны для получения с 1-го января',
        link: 'https://loopmario.xyz/J563Qz'
      },
      {
        img: 'vnds3.jpg',
        text: 'Интервью: Я всю жизнь работала на заводе в <span class="geo" data-type="city" data-dic="in"></span> и наконец получила компенсацию...',
        link: 'https://loopmario.xyz/J563Qz'
      },
      {
        img: 'vnds4.jpg',
        text: 'Внук из <span class="geo" data-type="city" data-dic="from"></span> получил компенсацию в несколько миллионов за свою бабушку и улетел из страны...',
        link: 'https://loopmario.xyz/J563Qz'
      },
      {
        img: 'vnds5.jpg',
        text: 'Ольга Олеговна получила компенсацию и улетела в Париж к любовнику бросив наследников...',
        link: 'https://loopmario.xyz/J563Qz'
      },
    ]
  },
  {
    enable: true,
    filters: true,
    list: [
      {
        img: 'molodost1.jpg',
        text: 'Как я стала молодой в 55 лет. Личная история девушки из <span class="geo" data-type="city" data-dic="from"></span>. 2 раза в день нужно пить одну чайную ложку си...',
        link: 'https://loopmario.xyz/Zgvxzk'
      },
      {
        img: 'molodost2.jpg',
        text: 'Отличница из <span class="geo" data-type="city" data-dic="from"></span> на уроке химии изобрела омолаживающие средство. Рецепт: 1 ложка соды и...',
        link: 'https://loopmario.xyz/Zgvxzk'
      },
      {
        img: 'molodost3.jpg',
        text: 'Народный рецепт молодости из <span class="geo" data-type="region" data-dic="from"></span>: семена черного перца смешать с...',
        link: 'https://loopmario.xyz/Zgvxzk'
      },
      {
        img: 'molodost4.jpg',
        text: 'Имбирь с медом даст Вашим суставам второй шанс. Записывайте рецепт: 1 корень имбиря замочить...',
        link: 'https://loopmario.xyz/Zgvxzk'
      },
      {
        img: 'molodost5.jpg',
        text: 'Школьник из <span class="geo" data-type="city" data-dic="from"></span> для своей бабушки придумал рецепт молодости. Ученые не могут объяснить это явление! Он просто смешал чеснок с...',
        link: 'https://loopmario.xyz/Zgvxzk'
      },
    ]
  },
];

var tzrsUser = [];
for (category in tzrsAll) {
  if(tzrsAll[category].filters && tzrsAll[category].enable){
    tzrsUser = tzrsUser.concat(tzrsAll[category].list)
  }
}

function getQuery(q) {
   return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

function geoSet(selector){
  ymaps.ready(function(){
    var geolocation = ymaps.geolocation;

    $(selector).find('.geo').each(function(){
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
  });
}

function appendTzr(selector){
  var tzr = tzrsUser[Math.floor(Math.random()*tzrsUser.length)];
  $(selector).append('<a href="' + tzr.link + location.search + '"><img src="assets/media/' + tzr.img + '"><p>' + tzr.text + '</p></a>');
}

$(function(){
  $('.tzr').each(function(){
    appendTzr($(this));
  });
  geoSet('body');
});

$(window).scroll(function() {
  if($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
    $('.ajax-posts').append('<div class="row ajax-load"> <div class="row"> <div class="col-md-12"> <div class="row line-posts"> <div class="col-md-6"> <div class="tzr line"></div> </div> <div class="col-md-6"> <div class="tzr line"></div> </div> </div> </div> </div> <div class="col-md-3"> <div class="tzr cube"></div> </div> <div class="col-md-3"> <div class="tzr cube"></div> </div> <div class="col-md-3"> <div class="tzr cube"></div> </div> <div class="col-md-3"> <div class="tzr cube"></div> </div> <div class="row"> <div class="col-md-12"> <div class="row line-posts"> <div class="col-md-6"> <div class="tzr line"></div> </div> <div class="col-md-6"> <div class="tzr line"></div> </div> </div> </div> </div> <div class="col-md-3"> <div class="tzr cube"></div> </div> <div class="col-md-3"> <div class="tzr cube"></div> </div> <div class="col-md-3"> <div class="tzr cube"></div> </div> <div class="col-md-3"> <div class="tzr cube"></div> </div></div>');
    ymaps.ready(function(){
      var geolocation = ymaps.geolocation;

      $('.ajax-posts .ajax-load:last-child .tzr').each(function(){
        appendTzr($(this));
      });
      geoSet('.ajax-posts .ajax-load:last-child');
    });
    
  }
});