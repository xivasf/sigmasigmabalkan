window.addEventListener("DOMContentLoaded", function () {
    //slider_js();
    swiper_slider();
    search_complete();
    $('input.searchMobileInput').on('keyup', function () {
        let empty = false;
        $('input.searchMobileInput').each(function () {
            empty = $(this).val().length == 0;
        });
        if (empty) {
            $('.searchMobileBtn').attr('disabled', 'disabled');
        } else {
            $('.searchMobileBtn').attr('disabled', false);
            $("input.searchMobileInput").on('keyup', function (e) {
                if (e.keyCode === 13) {
                    window.location.replace("/search/" + $("input.searchMobileInput").val());
                }
                $(".searchMobileBtn").on('click', function () {
                    window.location.replace("/search/" + $("input.searchMobileInput").val());
                });
            });
        }
    });
    let mobile_icon = document.querySelector("#menu-mobile");
    let mobile_close_icon = document.querySelector(".mobile-close");
    let mobile_menu = document.querySelector(".mobile-menu");
    if (mobile_icon) {
        mobile_icon.addEventListener('click', function (e) {
            document.querySelector(".mobile-menu").style.right = "0";
            e.stopPropagation();
        })
    }
    if (mobile_close_icon) {
        mobile_close_icon.addEventListener('click', function (e) {
            document.querySelector(".mobile-menu").style.right = "-310px";
        })
    }
    mobile_menu.addEventListener('click', function (e) {
        e.stopPropagation();
    })
    document.addEventListener('click', function () {
        document.querySelector(".mobile-menu").style.right = "-310px";
    })


    hide_show_content();
    //animated();
    scrollToTarget();
    lazyLoad();
    add_module();
    game_share();
    console.log("aaa")
    let slider_categories_class = document.querySelectorAll(".sliderCategoryList");
    console.log(slider_categories_class)
    slider_categories_class.forEach((userItem) => {
        let id_category = $(userItem).find('.game-category-slider').attr("id");
        console.log(id_category)
        let data_speed = $(userItem).find('.game-category-slider').attr("data-speed");
        let data_action_prev = $(userItem).find('.game-category-slider').attr("data-action-prev");
        let data_action_next = $(userItem).find('.game-category-slider').attr("data-action-next");
        category_slider(id_category, data_speed, data_action_prev, data_action_next);
    });

});

function category_slider(id, data_speed, data_action_prev, data_action_next) {
    console.log("aaa")
    if ($('#' + id).find(".swiper-slide").length > 10) {
        let nav_prev = '.' + data_action_prev;
        let nav_next = '.' + data_action_next;
        var swiperCategoryHome = new Swiper('#' + id, {
            spaceBetween: 10,
            speed: parseInt(data_speed),
            slidesPerView: "auto",
            slidesPerGroup: 3,
            loop: false,
            autoplay: false,
            draggable: true,
            navigation: {
                nextEl: nav_next,
                prevEl: nav_prev,
            },
            breakpoints: {}
        });
    }
    swiperCategoryHome.on('slideChange', function () {
        lazyLoad();
    });
}

function game_share() {
    close_popup();
    $("._share_btn").click(function () {
        open_popup();
    })
    $(".popup-close").click(function () {
        close_popup();
    })
    $(".popup-bg").click(function () {
        close_popup();
    })
}

function open_popup() {
    $(".popup-bg").show();
    $(".popup-share").show();
    $('.share_social_list').find('.st-btn').addBack().show();
    $("html").css("overflow", "hidden")
}

function close_popup() {
    $(".popup-bg").hide();
    $(".popup-share").hide();
    $("html").css("overflow", "");
}

function add_module() {
    if (!id_game && !url_game) {
        return
    }
    let url = "/add-module.ajax";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            id_game: id_game,
            url_game: url_game
        },
        success: function (response) {
            if (response) {
                let data = JSON.parse(response);

                $("#rate-area").html(data.rate);
                $("#comment-area").html(data.comment);
            }
        }
    })
}

function lazyLoad() {
    $('.lazy').Lazy({
        effect: "fadeIn", effectTime: 300,
    });
}

function animated() {
    var wow = new WOW({boxClass: 'wow', animateClass: 'animate__animated', offset: 60, mobile: true, live: true})
    wow.init();
}

var gameShare = document.querySelectorAll("._game-share");
gameShare.forEach((function (e) {
    e.addEventListener("click", (function (e) {
        navigator.share ? navigator.share({title: document.title, url: location.href}).then((function () {
            console.log("Thanks for sharing!")
        })).catch(console.error) : console.log("No native share support")
    }))
}));

function scrollToTarget() {
    $(".scrollTo").on("click", (function (e) {
        e.preventDefault();
        var t = $(this).attr("data-target");
        let s = $("#" + t);
        $("html, body").animate({scrollTop: s.offset().top}, 500, "swing")
    }));
}

function search_complete() {
    $("#search").keyup(delay(function (e) {
        var keyword = $("#search").val();
        if (keyword.length >= 3) {
            search_complete(keyword);
        }
    }, 700));

    function search_complete(s) {
        var metadataload = {};
        metadataload.keywords = s;
        jQuery.ajax({
            url: "game-results-search.ajax",
            data: metadataload,
            type: 'GET',
            success: function (data) {
                if (data) {
                    $("#results").show();
                    $("#results").html(data);
                    var i = document.getElementById("search");
                    i.addEventListener("focus", (function () {
                        document.getElementById("results").style.display = "block"
                    })), i.addEventListener("focusout", (function () {
                        setTimeout((function () {
                            document.getElementById("results").style.display = "none"
                        }), 500)
                    }))
                    $("#search").keyup(delay(function (e) {
                        var keyword = $("#search").val();
                        if (keyword.length < 3) {
                            $("#results").hide();
                        }
                    }, 700));
                }
            }
        });
    }

    $("#search").on('keyup', function (e) {
        let empty = false;
        $('input#search').each(function () {
            empty = $(this).val().length == 0;
        });

        if (empty) {
            $('#search_game').attr('disabled', 'disabled');
        } else {
            $('#search_game').attr('disabled', false);
            if (e.keyCode === 13) {
                window.location.replace("/search/" + $("#search").val());
            }
            $("#search_game").on('click', function () {
                window.location.replace("/search/" + $("#search").val());
            });
        }
    });

}

function hide_show_content() {
    let height_content = $('.content-inner .game-description').outerHeight();

    if (height_content <= 719) {
        $('.show_content').css({'display': 'none'})
        $('.content-inner').css({'padding-bottom': '20px'})
        $('.content-inner').attr('style', 'height:unset');
    } else {
        $('.content-inner').attr('style', 'height:720px;overflow:hidden');
        $('.show_content').css({'display': 'flex'});
        $('.game-content-page').css({'padding-bottom': '60px'})
        $('.game-description').css({'padding-bottom': '20px'})
    }

    $('.ShowMore_button').click(function () {
        if ($('.ShowMore_button').hasClass('more')) {
            $('.ShowMore_button').removeClass('more')
            $('.content-inner').animate({
                'height': height_content + 'px', 'overflow': 'hidden', 'animation': 'height 1000ms ease 0ms'
            }, {
                easing: 'swing', complete: function () {
                    $('.content-inner').attr('style', 'height:auto');
                    $('.ShowMore_button').html('<span>Show less</span> <span class="svg-icon svg-icon--share btn__icon bounce" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-keyboard_arrow_up"></use> </svg> </span>');
                    $('.ShowMore_button').addClass('less')

                }
            })
        } else {
            $('.ShowMore_button').removeClass('less')
            $('.content-inner').animate({
                'height': '720px', 'overflow': 'hidden', 'animation': 'height 1000ms ease 0ms'
            }, {
                easing: 'swing', complete: function () {
                    $('.content-inner').attr('style', 'height:720px;overflow:hidden');
                    $('.ShowMore_button').html('<span>Show more</span> <span class="svg-icon svg-icon--share btn__icon bounce" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-keyboard_arrow_down"></use> </svg> </span>');
                    $('.ShowMore_button').addClass('more')
                }
            })

        }

    })


}


function swiper_slider() {

    var swiperPopular = new Swiper('#game_popular_slider', {
        spaceBetween: 10,
        speed: 1000,
        slidesPerView: "auto",
        slidesPerGroup: 3,
        loop: false,

        navigation: {
            nextEl: '#game_popular_slider .js-carousel-next',
            prevEl: '#game_popular_slider .js-carousel-prev'
        },
        draggable: true,
        breakpoints: {
            1386: {
                slidesPerView: 6

            },
            1199: {
                slidesPerView: 5

            },
            991: {
                slidesPerView: 4

            },
            768: {

                slidesPerView: 3
            },
            500: {

                slidesPerView: 2
            }
        }
    });
    swiperPopular.on('slideChange', function () {
        lazyLoad();
    });

    var swiperHot = new Swiper('#game_hot_slider', {
        spaceBetween: 10,
        speed: 1000,
        slidesPerView: "auto",
        slidesToScroll: 3,
        loop: false,

        navigation: {
            nextEl: '#game_hot_slider .js-carousel-next',
            prevEl: '#game_hot_slider .js-carousel-prev'
        },
        draggable: true,

    });
    swiperHot.on('slideChange', function () {
        lazyLoad();
    });
    var game_series = new Swiper('#game_series  .swiper-container', {
        spaceBetween: 10,
        speed: 1000,
        slidesPerView: "auto",
        slidesToScroll: 3,
        loop: false,
        navigation: {
            nextEl: '#game_series .next_btn_series',
            prevEl: '#game_series .prev_btn_series'
        },
        draggable: true,

    });
    game_series.on('slideChange', function () {
        lazyLoad();
    });
    var swiperWeek = new Swiper('#game_top_week .swiper-container', {
        spaceBetween: 10,
        speed: 800,
        slidesPerView: 9,
        slidesPerGroup: 3,
        loop: false,
        autoplay: false,
        navigation: {
            nextEl: '#game_top_week .next_btn_top',
            prevEl: '#game_top_week .prev_btn_top',
        },
        draggable: true,
        breakpoints: {
            1386: {
                slidesPerView: 8,
                slidesPerGroup: 3

            },
            1199: {
                slidesPerView: 6.8,
                slidesPerGroup: 3

            },
            991: {
                slidesPerView: 5,
                slidesPerGroup: 3

            },
            768: {

                slidesPerView: 4,
                slidesPerGroup: 3
            },
            500: {

                slidesPerView: 3,
                slidesPerGroup: 3
            }
        }
    });
    swiperWeek.on('slideChange', function () {
        lazyLoad();
    });
}

function slider_js() {
    var swiperPopular = new Swiper('#slider_popular', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        speed: 600,
        freeMode: true,
        navigation: {
            nextEl: '#slider_popular .next_btn',
            prevEl: '#slider_popular .prev_btn',
        },
        slidesOffsetBefore: -15,
        draggable: true,
        breakpoints: {
            1386: {
                slidesPerView: 'auto',
                freeMode: true,
            },
            1199: {
                slidesPerView: 'auto',
                freeMode: true,
            },
            991: {
                slidesPerView: 'auto',
                freeMode: true,
            },
            600: {
                freeMode: true,
                slidesPerView: 'auto',
            },
        }
    });
    var swiperHot = new Swiper('#slider', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        speed: 600,
        freeMode: true,
        navigation: {
            nextEl: '#slider .next_btn',
            prevEl: '#slider .prev_btn',
        },
        slidesOffsetBefore: -15,
        draggable: true,
        breakpoints: {
            1386: {
                slidesPerView: 'auto',
                freeMode: true,
            },
            1199: {
                slidesPerView: 'auto',
                freeMode: true,
            },
            991: {
                slidesPerView: 'auto',
                freeMode: true,
            },
            600: {
                freeMode: true,
                slidesPerView: 'auto',
            },
        }
    });


}

var btn = $('#button-gotop');
$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.fadeIn();
    } else {
        btn.fadeOut();
    }
});
btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});

function open_fullscreen() {
    let game = document.getElementById("game-area");
    if (game == null) return;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {

        if (game.requestFullscreen) {
            game.requestFullscreen();
        } else if (game.msRequestFullscreen) {
            game.msRequestFullscreen();
        } else if (game.mozRequestFullScreen) {
            game.mozRequestFullScreen();
        } else if (game.webkitRequestFullscreen) {
            game.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

function copyToClipboard(element, e) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $(e).html('COPIED!!');
    setTimeout(function () {
        $(e).html('Copy');
    }, 3000);
    $temp.remove();
}
