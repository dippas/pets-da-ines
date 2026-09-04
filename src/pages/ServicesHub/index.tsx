import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import type { CSSProperties } from 'react'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslations } from 'use-intl'
import Button from '../../components/Button'
import Img from '../../components/Img'
import Label from '../../components/Label'
import { useLocale } from '../../hooks/useLocale'
import { servicePhotoPool, useServicePhoto } from '../../hooks/useServicePhoto'
import PawBlob from '../../icons/PawBlob'
import { pagePath } from '../../routes/paths'
import 'swiper/css'
import 'swiper/css/navigation'

const GALLERY_HEIGHTS = [1365, 1024, 1024, 1365, 1024, 1365, 1024, 1024]

const GALLERY_COLUMNS = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
]

export default function ServicesHub() {
  const t = useTranslations()
  const locale = useLocale()
  const pricingPath = pagePath('pricing', locale)
  const petBoardingPhoto = useServicePhoto(
    'pet-boarding',
    'detail:pet-boarding',
  )
  const petSittingPhoto = useServicePhoto('pet-sitting', 'detail:pet-sitting')
  const dogWalkingPhoto = useServicePhoto('dog-walking', 'detail:dog-walking')
  const dogWalkingPool = servicePhotoPool('dog-walking')
  const dogWalkingGalleryAlt = t.raw(
    'services.dogWalking.galleryAlt',
  ) as string[]

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-2 sm:px-8 sm:pt-16">
        <Label tracking="eyebrow" className="mb-4">
          {t('services.hub.eyebrow')}
        </Label>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
          {t('services.hub.heading')}
        </h1>
        <p className="max-w-measure text-lg prose">{t('services.hub.intro')}</p>
      </div>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-measure-lg lg:max-w-none">
          <Label className="step-number">01</Label>
          <h2 className="section-heading">{t('services.petBoarding.title')}</h2>
          <p className="mb-4 text-lg prose">
            {t('services.petBoarding.detail1')}
          </p>
          <p className="mb-8 text-lg prose">
            {t('services.petBoarding.detail2')}
          </p>
          <Button to={pricingPath} variant="outline">
            {t('common.cta.seePricing')}
            <ArrowRightIcon size={16} weight="bold" />
          </Button>
        </div>
        <Img
          src={petBoardingPhoto}
          alt={t('services.petBoarding.photoAlt')}
          className="h-service-detail w-full rounded-3xl object-cover"
        />
      </section>

      <section className="bg-panel">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16">
          <Img
            src={petSittingPhoto}
            alt={t('services.petSitting.photoAlt')}
            className="h-service-detail w-full order-2 rounded-3xl object-cover lg:order-0"
          />
          <div className="max-w-measure-lg lg:max-w-none">
            <Label className="step-number">02</Label>
            <h2 className="section-heading">
              {t('services.petSitting.title')}
            </h2>
            <p className="mb-4 text-lg prose">
              {t('services.petSitting.detail1')}
            </p>
            <p className="mb-4 text-lg prose">
              {t('services.petSitting.detail2')}
            </p>
            <p className="mb-8 text-lg prose">
              {t('services.petSitting.detail3')}
            </p>
            <Button to={pricingPath} variant="outline">
              {t('common.cta.seePricing')}
              <ArrowRightIcon size={16} weight="bold" />
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-measure-lg lg:max-w-none">
          <Label className="step-number">03</Label>
          <h2 className="section-heading">{t('services.dogWalking.title')}</h2>
          <p className="mb-4 text-lg prose">
            {t('services.dogWalking.detail1')}
          </p>
          <p className="mb-8 text-lg prose">
            {t('services.dogWalking.detail2')}
          </p>
          <Button to={pricingPath} variant="outline">
            {t('common.cta.seePricing')}
            <ArrowRightIcon size={16} weight="bold" />
          </Button>
        </div>
        <Img
          src={dogWalkingPhoto}
          alt={t('services.dogWalking.photoAlt')}
          className="h-service-detail w-full rounded-3xl object-cover"
        />
      </section>

      <section className="relative overflow-hidden bg-indigo py-16 sm:py-16">
        <PawBlob
          className="pointer-events-none absolute -top-20 -left-15 size-70 -rotate-6 opacity-15"
          color="var(--color-off-white)"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
          <div className="mb-10">
            <Label tracking="eyebrow" className="mb-3 text-gold">
              {t('services.dogWalking.galleryEyebrow')}
            </Label>
            <h2 className="text-3xl font-bold text-off-white sm:text-5xl">
              {t('services.dogWalking.galleryHeading')}
            </h2>
          </div>
          <div
            className="swiper-nav-light relative"
            style={
              {
                '--swiper-navigation-color': 'var(--color-indigo)',
              } as CSSProperties
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
              spaceBetween={12}
              slidesPerView={2.15}
              breakpoints={{ 768: { slidesPerView: 4 } }}
              a11y={{
                prevSlideMessage: t('common.carousel.previous'),
                nextSlideMessage: t('common.carousel.next'),
              }}
            >
              {GALLERY_COLUMNS.map((column) => (
                <SwiperSlide key={column[0]}>
                  <div className="flex flex-col gap-3">
                    {column.map((index) => (
                      <Img
                        key={index}
                        src={dogWalkingPool[index]}
                        alt={dogWalkingGalleryAlt[index]}
                        width={768}
                        height={GALLERY_HEIGHTS[index]}
                        className="aspect-3/4 w-full rounded-2xl object-cover sm:aspect-auto"
                      />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}
