import type { CSSProperties, ReactElement } from 'react'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslations } from 'use-intl'
import 'swiper/css'
import 'swiper/css/navigation'

interface CarouselProps {
  items: ReactElement[]
  ariaLabel: string
}

export default function Carousel({ items, ariaLabel }: CarouselProps) {
  const t = useTranslations()

  return (
    <section
      aria-label={ariaLabel}
      className="swiper-nav-light relative"
      style={
        { '--swiper-navigation-color': 'var(--color-indigo)' } as CSSProperties
      }
    >
      <div className="carousel-heading-nav">
        <button
          type="button"
          className="carousel-nav-prev swiper-button-prev"
          aria-label={t('common.carousel.previous')}
        />
        <button
          type="button"
          className="carousel-nav-next swiper-button-next"
          aria-label={t('common.carousel.next')}
        />
      </div>
      <Swiper
        modules={[Navigation, A11y]}
        navigation={{
          prevEl: '.carousel-nav-prev',
          nextEl: '.carousel-nav-next',
          addIcons: false,
        }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        a11y={{
          prevSlideMessage: t('common.carousel.previous'),
          nextSlideMessage: t('common.carousel.next'),
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.key}>{item}</SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
