$(function() {

    const worksSlider = $('[data-slider="slick"]');

    /* Filter
    =====================*/
    let filter = $("[data-filter]");

    filter.on("click", function(event) {
        event.preventDefault();

        let cat = $(this).data('filter');

        if(cat == 'all') {
            $("[data-cat]").removeClass("hide");
        } else {
            $("[data-cat]").each(function() {
                let workCat = $(this).data('cat');

                if(workCat != cat) {
                    $(this).addClass('hide');
                } else {
                    $(this).removeClass('hide');
                }
            });
        }
    });




    /* Modal
    =====================*/

    const modalCall = $("[data-modal]");
    const modalClose = $("[data-close]");

    function openModal(modalId) {
        let modal = $(modalId);
        if (!modal.length) {
            return;
        }

        let dialog = modal.find(".modal__dialog");

        modal.addClass("show");
        $("body").addClass("no-scroll");

        if (window.gsap) {
            gsap.killTweensOf(dialog.get());
            gsap.set(modal.find(".timeline__item, .progress-bar__item, .modal-work__content > *").get(), { clearProps: "all" });
            gsap.fromTo(dialog.get(), {
                scale: 0.92,
                y: 24,
                opacity: 0
            }, {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 0.36,
                ease: "back.out(1.4)"
            });
        } else {
            setTimeout(function() {
                dialog.css({
                    transform: "scale(1)"
                });
            }, 200);
        }

        if (worksSlider.length && worksSlider.hasClass("slick-initialized")) {
            worksSlider.slick('setPosition');
        }
    }

    function closeModal(modal) {
        let modalParent = $(modal);
        let dialog = modalParent.find(".modal__dialog");

        if (window.gsap) {
            gsap.killTweensOf(dialog.get());
            gsap.to(dialog.get(), {
                scale: 0.94,
                y: 18,
                opacity: 0,
                duration: 0.22,
                ease: "power2.in",
                onComplete: function() {
                    modalParent.removeClass('show');
                    $("body").removeClass('no-scroll');
                    gsap.set(dialog.get(), { clearProps: "transform,opacity" });
                }
            });
        } else {
            dialog.css({
                transform: "scale(0)"
            });

            setTimeout(function() {
                modalParent.removeClass('show');
                $("body").removeClass('no-scroll');
            }, 200);
        }
    }

    modalCall.on("click", function(event) {
        event.preventDefault();

        let $this = $(this);
        let modalId = $this.data('modal');

        openModal(modalId);
    });


    modalClose.on("click", function(event) {
        event.preventDefault();

        let $this = $(this);
        let modalParent = $this.parents('.modal');

        closeModal(modalParent);
    });


    $(".modal").on("click", function(event) {
        let $this = $(this);

        closeModal($this);
    });

    $(".modal__dialog").on("click", function(event) {
        event.stopPropagation();
    });



    /* Slider: https://kenwheeler.github.io/slick/
    =====================*/

    worksSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        dots: true
    });

    $(".slickPrev").on("click", function(event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick("slickPrev");
    });

    $(".slickNext").on("click", function(event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick("slickNext");
    });

// Mobile nav
    const navToggle = $("#nav_2Toggle, #navToggle")
    const nav = $("#nav_2, #nav")

    navToggle.on("click", function (event) {
        event.preventDefault();

        nav.toggleClass("show")

    })


});
