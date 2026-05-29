<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

defineProps(['items'])
</script>

<template>
  <swiper
    :modules="[Navigation]"
    :slides-per-view="'auto'"
    :space-between="16"
    navigation
  >
    <swiper-slide v-for="item in items" :key="item.id">
      <slot :item="item" />
    </swiper-slide>
  </swiper>
</template>