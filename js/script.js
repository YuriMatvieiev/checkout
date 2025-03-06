$(document).ready(function () {
  // Initialize the main slider
  const $sliderTop = $(".js-slider-top").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    prevArrow:
      '<button type="button" class="hero__arrow hero__arrow-prev"><i class="fa-solid fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="hero__arrow hero__arrow-next"><i class="fa-solid fa-angle-right"></i></button>',
  });

  // Initialize the bottom slider with disabled interactions
  const $sliderBottom = $(".js-slider-bottom").slick({
    slidesToShow: 4,
    slidesToScroll: 0,
    dots: false,
    centerMode: true,
    focusOnSelect: false,
    swipe: false,
    draggable: false,
    touchMove: false,
    arrows: false,
  });

  // Handle click event on bottom slider to navigate top slider
  $sliderBottom.on("click", ".slick-slide", function () {
    const index = $(this).data("slick-index"); // Use slick-index for accuracy
    if (typeof index !== "undefined") {
      $sliderTop.slick("slickGoTo", index);
    }
  });

  // Update the active slide in the bottom slider when the top slider changes
  $sliderTop.on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      $sliderBottom.find(".slick-slide").removeClass("slick-active");
      $sliderBottom
        .find(`.slick-slide[data-slick-index='${nextSlide}']`)
        .addClass("slick-active");
    }
  );

  function startCountdown(durationInSeconds) {
    let timer = durationInSeconds;
    const $countdownElement = $(".js-countdown");

    function updateCountdown() {
      const hours = String(Math.floor(timer / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((timer % 3600) / 60)).padStart(2, "0");
      const seconds = String(timer % 60).padStart(2, "0");

      $countdownElement.text(`${hours}:${minutes}:${seconds}`);

      if (timer > 0) {
        timer--;
        setTimeout(updateCountdown, 1000);
      }
    }

    updateCountdown();
  }

  // accordion
  $(".faq__accordion")
    .find(".faq__accordion-toggle")
    .click(function () {
      $(this).next().slideToggle("600");
      $(".faq__accordion-content").not($(this).next()).slideUp("600");
    });
  $(".faq__accordion-toggle").on("click", function () {
    $(this).toggleClass("active").siblings().removeClass("active");
  });

  // Start a 10-minute countdown
  startCountdown(600);
});
