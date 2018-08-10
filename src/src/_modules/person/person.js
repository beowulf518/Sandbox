'use strict';

export default class Person {
  constructor() {
    let cta = document.querySelectorAll(".person-cta");
    let body = document.querySelector("body");

    for (var i=0; i < cta.length; i++){
      cta[i].addEventListener("click", (e) => {
        let id = e.target.dataset.person;

        // show slider
        let find = ".swiper-slide[data-person=" + id + "]";
        let slide = document.querySelector(find);
        let slideNumber = Array.from(slide.parentNode.children).indexOf(slide);

        let swiperClosest = slide.closest(".swiper-container");
        swiperClosest.classList.add("swiper-show");

        body.classList.add("no-scroll");

        // show THAT slide
        swiperClosest.swiper.slideTo(slideNumber);

        // Close slider when clicking outside
        swiperClosest.addEventListener("click", (e) => {
          if (e.target == swiperClosest){
            swiperClosest.classList.remove("swiper-show");
            body.classList.remove("no-scroll");
          }
        });

      });
    }
  }
}
