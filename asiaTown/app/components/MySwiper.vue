<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { A11y } from "swiper/modules";
import EffectCarousel from "./effect-carousel.esm.js";
import "swiper/css";
import "swiper/css/a11y";
import "./effect-carousel.css";
import "./MySwiper.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const swiperParameters = ref({
      modules: [A11y, EffectCarousel],
      slidesPerView: "auto",
      centeredSlides: true,
      loop: true,
      effect: "carousel",
      breakpoints: { 768: {} },
    });

    return {
      swiperParameters,
    };
  },
};
</script>


<template>
  <swiper v-bind="swiperParameters">
    <swiper-slide class="swiper-slide-aedc">
      <img
        class="swiper-slide-bg-image swiper-slide-bg-image-bdb6 swiper-carousel-animate-opacity"
        src="https://studio.swiperjs.com/demo-images/movies/01.jpg"
      />

      <div
        class="swiper-slide-content swiper-carousel-animate-opacity swiper-slide-content-7bb6"
      >
        <div class="swiper-slide-text swiper-slide-text-08c0">
          Spider-Man: No Way Home
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-slide-aedc">
      <img
        class="swiper-slide-bg-image swiper-slide-bg-image-bdb6 swiper-carousel-animate-opacity"
        src="https://studio.swiperjs.com/demo-images/movies/02.jpg"
      />

      <div
        class="swiper-slide-content swiper-carousel-animate-opacity swiper-slide-content-7bb6"
      >
        <div class="swiper-slide-text swiper-slide-text-08c0">Free Guy</div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-slide-aedc">
      <img
        class="swiper-slide-bg-image swiper-slide-bg-image-bdb6 swiper-carousel-animate-opacity"
        src="https://studio.swiperjs.com/demo-images/movies/03.jpg"
      />

      <div
        class="swiper-slide-content swiper-carousel-animate-opacity swiper-slide-content-7bb6"
      >
        <div class="swiper-slide-text swiper-slide-text-08c0">
          The Nice Guys
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-slide-aedc">
      <img
        class="swiper-slide-bg-image swiper-slide-bg-image-bdb6 swiper-carousel-animate-opacity"
        src="https://studio.swiperjs.com/demo-images/movies/04.jpg"
      />

      <div
        class="swiper-slide-content swiper-carousel-animate-opacity swiper-slide-content-7bb6"
      >
        <div class="swiper-slide-text swiper-slide-text-08c0">John Wick</div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-slide-aedc">
      <img
        class="swiper-slide-bg-image swiper-slide-bg-image-bdb6 swiper-carousel-animate-opacity"
        src="https://studio.swiperjs.com/demo-images/movies/05.jpg"
      />

      <div
        class="swiper-slide-content swiper-carousel-animate-opacity swiper-slide-content-7bb6"
      >
        <div class="swiper-slide-text swiper-slide-text-08c0">Avatar</div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-slide-aedc">
      <img
        class="swiper-slide-bg-image swiper-slide-bg-image-bdb6 swiper-carousel-animate-opacity"
        src="https://studio.swiperjs.com/demo-images/movies/06.jpg"
      />

      <div
        class="swiper-slide-content swiper-carousel-animate-opacity swiper-slide-content-7bb6"
      >
        <div class="swiper-slide-text swiper-slide-text-08c0">Encanto</div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-slide-aedc">
      <img
        class="swiper-slide-bg-image swiper-slide-bg-image-bdb6 swiper-carousel-animate-opacity"
        src="https://studio.swiperjs.com/demo-images/movies/07.jpg"
      />

      <div
        class="swiper-slide-content swiper-carousel-animate-opacity swiper-slide-content-7bb6"
      >
        <div class="swiper-slide-text swiper-slide-text-08c0">Eternals</div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-slide-aedc">
      <img
        class="swiper-slide-bg-image swiper-slide-bg-image-bdb6 swiper-carousel-animate-opacity"
        src="https://studio.swiperjs.com/demo-images/movies/08.jpg"
      />

      <div
        class="swiper-slide-content swiper-carousel-animate-opacity swiper-slide-content-7bb6"
      >
        <div class="swiper-slide-text swiper-slide-text-08c0">
          Jurassic World
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-slide-aedc">
      <img
        class="swiper-slide-bg-image swiper-slide-bg-image-bdb6 swiper-carousel-animate-opacity"
        src="https://studio.swiperjs.com/demo-images/movies/09.jpg"
      />

      <div
        class="swiper-slide-content swiper-carousel-animate-opacity swiper-slide-content-7bb6"
      >
        <div class="swiper-slide-text swiper-slide-text-08c0">Dr Strange</div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-slide-aedc">
      <img
        class="swiper-slide-bg-image swiper-slide-bg-image-bdb6 swiper-carousel-animate-opacity"
        src="https://studio.swiperjs.com/demo-images/movies/10.jpg"
      />

      <div
        class="swiper-slide-content swiper-carousel-animate-opacity swiper-slide-content-7bb6"
      >
        <div class="swiper-slide-text swiper-slide-text-08c0">
          Guardians Of The Galaxy
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
