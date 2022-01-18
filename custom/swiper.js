
const swipers = [
  {
    mainEl: '.playlist-swiper',
    nextEl: '.playlist-next-btn',
    prevEl: '.playlist-prev-btn',
  },
  {
    mainEl: '.mv-swiper',
    nextEl: '.mv-next-btn',
    prevEl: '.mv-prev-btn',
  },
  {
    mainEl: '.artists-swiper',
    nextEl: '.artists-next-btn',
    prevEl: '.artists-prev-btn',
  },
]

for(const swiper of swipers) {
  const nextBtn = $(swiper.nextEl)
  const prevBtn = $(swiper.prevEl)
  const slideLength = $$(`${swiper.mainEl} .swiper-slide`).length 
  const slideWidth = $(`${swiper.mainEl} .swiper-slide`).offsetWidth 
  const wraperWidth = $(`${swiper.mainEl} .swiper-wrapper`).offsetWidth
  const slidesPerView = Math.ceil(wraperWidth/slideWidth)
  const slideSet = slideLength/slidesPerView
  const trans3d = (slideLength*slideWidth)/slideSet
  let initTrans = 0 

  const swiperSlider = new Swiper(swiper.mainEl, {
    speed: 600,
    slidesPerView: slidesPerView,
    navigation: {
      nextEl: swiper.nextEl,
      prevEl: swiper.prevEl
    }
  })

  nextBtn.onclick = function() {
    initTrans -= trans3d  
    swiperSlider.setTranslate(initTrans)
  }

  prevBtn.onclick = function() {
    initTrans += trans3d 
    swiperSlider.setTranslate(initTrans)
  }
}