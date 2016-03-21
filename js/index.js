require.config({
    baseUrl: "js",
    paths: {
        "jquery": "libs/jquery-2.2.1.min",
        "swiper": "libs/swiper",
        "rem": "libs/rem",
    },
    shim: {
        'rem': {
            deps: ['jquery']
        },
    }
});

require(["rem","swiper"],function(swiper) {
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        hashnav: true
    });
});