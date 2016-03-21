(function(){
  window.addEventListener('load', function() {
    FastClick.attach(document.body);
  }, false);
}());

(function() {
  var img, margin;
  var m1 = new Hammer($(".s1 .b1 img")[0]);
  var m2 = new Hammer($(".s1 .b2 img")[0]);
  var m3 = new Hammer($(".s1 .b3 img")[0]);
  m1.get('pan').set({
    direction: Hammer.DIRECTION_ALL
  });
  m2.get('pan').set({
    direction: Hammer.DIRECTION_ALL
  });
  m3.get('pan').set({
    direction: Hammer.DIRECTION_ALL
  });
  m1.on("panstart", function(e) {
    img = $(".s1 .b1 img");
    margin = parseInt(img.css("margin-left"), 10);
  });
  m1.on("pan", function(e) {
    var delta = margin + e.deltaX;
    if (delta >= 0 && delta <= 120) {
      img.css({
        "margin-left": margin + e.deltaX
      });
    }
  });
  m2.on("panstart", function(e) {
    img = $(".s1 .b2 img");
    margin = parseInt(img.css("margin-left"), 10);
  });
  m2.on("pan", function(e) {
    var delta = margin + e.deltaX;
    if (delta >= -100 && delta <= 0) {
      img.css({
        "margin-left": margin + e.deltaX
      });
    }
  });
  m3.on("panstart", function(e) {
    img = $(".s1 .b3 img");
    margin = parseInt(img.css("margin-left"), 10);
  });
  m3.on("pan", function(e) {
    var delta = margin + e.deltaX;
    if (delta >= 0 && delta <= 120) {
      img.css({
        "margin-left": margin + e.deltaX
      });
    }
  });
})();
(function() {
  var slider = document.querySelector('.s4 .slider');
  var mc = new Hammer(slider);
  var b1 = document.querySelector('.s4 .b1');
  var ball = document.querySelector('.s4 .ball');
  var $mask = $(".s4 .mask");
  mc.on("panright swiperight", function(ev) {
    classie.add(b1, 'b1right');
    classie.add(ball, 'ballright');
    window.setTimeout(function(){$mask.show()},2000);
  });
  mc.on("panleft swipeleft", function(ev) {
    classie.remove(b1, 'b1right');
    classie.remove(ball, 'ballright');
  });
})();
var menuLeft = document.getElementById('menu'),
  showLeftPush = document.getElementById('btn'),
  mainContent = document.querySelector('.swiper-container'),
  body = document.body;
showLeftPush.onclick = function() {
  classie.toggle(this, 'active');
  classie.toggle(body, 'toright');
};
mainContent.onclick = function() {
  classie.remove(this, 'active');
  classie.remove(body, 'toright');
};
$(".content a,.accordion p").on('click', function(event) {
  event.preventDefault();
  var num = $(this).data('num');
  $("." + num).trigger('click');
});
var tempradio = null;

function check(checkedRadio) {
  if (tempradio == checkedRadio) {
    tempradio.checked = false;
    tempradio = null;
  } else {
    tempradio = checkedRadio;
  }
}
$(".s4 .mask").on('click', function(event) {
  event.preventDefault();
  $(".s4 video").show();
});
$(".s4 .t9").on('click', function(event) {
  event.preventDefault();
  $(".s4 .mask video").hide();
  $(".s4 .mask").hide();
  $(".pa5").trigger('click');
});
$(".detailbtn").on('click', function(event) {
  event.preventDefault();
  $(this).siblings('.popup').show();
});
$(".close").on('click', function(event) {
  event.preventDefault();
  $(this).parent().hide();
});
