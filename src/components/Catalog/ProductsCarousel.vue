<template>
	<div class="products-carousel__container">
		<div class="products-carousel">
			<div class="products-carousel__title heading-1">{{ title }}</div>
			<carousel
				ref="carousel"
				:settings="settings"
				class="products-carousel__wrap d-flex"
				@slide-start="justifySlides"
				@slide-end="justifySlides"
			>
				<template #slides>
					<slide
						v-for="(product, index) of products"
						:key="index"
						class="products-carousel__slide"
					>
						<CatalogProduct :product="product" />
					</slide>
				</template>
			</carousel>
		</div>
		<div class="products-carousel__nav">
			<div class="products-carousel__nav-buttons">
				<NavButton
					side="left"
					color="green"
					class="products-carousel__nav-button products-carousel__nav-button-prev"
					@click="slidePrev"
				/>
				<NavButton
					side="right"
					color="green"
					class="products-carousel__nav-button products-carousel__nav-button-next"
					@click="slideNext"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import CatalogProduct from './CatalogProduct'
import NavButton from '@/components/Common/NavButton'

export default {
	components: {
    Carousel,
    Slide,
    CatalogProduct,
    NavButton,
	},
	props: {
		title: {
			type: String,
			default: 'Products Carousel',
		},
		products: {
			type: Array,
			default: () => []
		}
	},
	data () {
		return {
			settings: {
				itemsToShow: 2,
				itemsToSlide: 1,
				wrapAround: true,
				snapAlign: 'start',
				breakpoints: {
					993: {
						itemsToShow: 4
					},
					415: {
						itemsToShow: 3
					}
				}
			},
			// breakpoints are mobile first
			// any settings not specified will fallback to the carousel settings
			/*breakpoints: {
				// 700px and up
				700: {
					itemsToShow: 3.5,
					snapAlign: 'center',
				},
				// 1024 and up
				1024: {
					itemsToShow: 5,
					snapAlign: 'start',
				},
			},*/
			breakpoint: 'lg'
		}
	},
	created () {
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
	},
	unmounted () {
		window.removeEventListener('resize', this.handleResize)
	},
	mounted () {
		this.justifySlides()
	},
	methods: {
		handleResize () {
			if (window.innerWidth > 992) this.breakpoint = 'lg'
			else if (window.innerWidth > 414) this.breakpoint = 'md'
			else this.breakpoint = 'sm'
			this.justifySlides()
		},
		async justifySlides () {
			await this.delay(100)
			let allSlides = document.querySelectorAll('.carousel__slide > .catalog-product')
			let v = 1
			for (let slide of allSlides) {
				const isVisible = slide.closest('.carousel__slide--visible') !== null
				if (isVisible) {
					slide.style.boxShadow = '0px 4px 22px rgba(0, 0, 0, 0.12)'
					switch (v) {
						case 1:
							if (this.breakpoint == 'lg') {
								slide.style.marginLeft = '-10px'
								slide.style.marginRight = '0'
							} else if (this.breakpoint == 'md') {
								slide.style.marginLeft = '-10px'
								slide.style.marginRight = '0'
							} else if (this.breakpoint == 'sm') {
								slide.style.marginLeft = '-10px'
								slide.style.marginRight = '0'
							}
							break
						case 2:
							if (this.breakpoint == 'lg') {
								slide.style.marginLeft = '-5px'
								slide.style.marginRight = '0'
							} else if (this.breakpoint == 'md') {
								slide.style.marginLeft = '0'
								slide.style.marginRight = '0'
							}	else if (this.breakpoint == 'sm') {
								slide.style.marginLeft = '0'
								slide.style.marginRight = '-10px'
							}
							break
						case 3:
							if (this.breakpoint == 'lg') {
								slide.style.marginLeft = '0'
								slide.style.marginRight = '-5px'
							} else if (this.breakpoint == 'md') {
								slide.style.marginLeft = '0'
								slide.style.marginRight = '-10px'
							}
							break
						case 4:
							if (this.breakpoint == 'lg') {
								slide.style.marginLeft = '0'
								slide.style.marginRight = '-10px'
							}
							break
					}
					v++
				}
				else {
					slide.style.boxShadow = 'unset'
					slide.style.marginLeft = '0'
					slide.style.marginRight = '0'					
				}
			}
		},
    slidePrev() {
      this.$refs.carousel.prev()
    },
    slideNext() {
      this.$refs.carousel.next()
    },
		delay (duration) {
			return new Promise((resolve) => setTimeout(resolve, duration))
		}
	}

}	
</script>
