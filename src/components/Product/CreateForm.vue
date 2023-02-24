<template>
	<form class="create-product__form">
		<div class="create-product__form-blocks d-flex flex-column">
			<div class="create-product__form-block create-product__form-block-main">
				<div class="create-product__form-block-error">{{ errors.name }}</div>
				<div class="create-product__form-block-item create-product__form-name">
					<div class="create-product__form-label">
						Укажите название товара*
					</div>
					<input
						class="create-product__form-field"
						placeholder="Например оборудование"
						v-model="v$.product.name.$model"
						:class="{ 'create-product__form-field-error': v$.product.name.$error }"
					/>
					<div class="create-product__form-hint">Не менее 35 символов</div>
				</div>
				<div class="create-product__form-block-error create-product__form-block-error-category">{{ errors.category }}</div>
				<div class="create-product__form-block-item create-product__form-category">
					<div class="create-product__form-label">
						Выберите категорию*
					</div>
					<div class="create-product__form-selects d-flex flex-wrap">
						<div
							v-for="(cat, index) in cats"
							:key="`category-${index}`"
							class="create-product__form-select"
						>
							<div
								class="create-product__form-select-field d-flex justify-content-between align-items-center"
								@click="cat.show = !cat.show"
							>
								<div class="create-product__form-select-field-value">{{ cat.name }}</div>
								<img class="create-product__form-select-field-arrow" :src="require('@/assets/images/arrow-down-green.png')">
							</div>
							<div
								v-show="cat.show"
								class="create-product__form-select-menu"
							>
								<div
									v-for="(category, index) of cat.list"
									:key="index"
									class="create-product__form-select-menu-item"
									@click="selectCategory(category, cat.level)"
								>{{ category.name }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="create-product__form-block create-product__form-block-images">				
				<div class="create-product__form-block-item">
					<div class="create-product__form-label">
						Фото
					</div>
					<div class="create-product__form-thumbs-sublabel">
						Первое фото будет на обложке объявления. Перетащите, чтобы изменить порядок.
					</div>
					<div class="create-product__form-thumbs d-flex flex-wrap">
						<div
							v-for="(img, index) of imgs"
							:key="`thumb-${index}`"
							class="create-product__form-thumb d-flex flex-column justify-content-center align-items-center"
							:class="{ 'create-product__form-thumb-active': img.active }"
							:style="{ 'background-image': `url(${img.imageData})` }"
							@click="selectImage(img, index)"
						>
							<img v-if="!img.imageData" :src="require('@/assets/images/add-image.png')">
							<div v-if="img.active" class="create-product__form-thumb-text">Добавить фото</div>
							<input
								type="file"
								style="display: none"
								:ref="el => addImageRefs.push(el)"
								@change="onImageSelected($event, index)"
							>
						</div>
					</div>
				</div>
			</div>
			<div class="create-product__form-block create-product__form-block-description">
				<div class="create-product__form-block-error">{{ errors.description }}</div>
				<div class="create-product__form-block-item create-product__form-description">
					<div class="create-product__form-label">
						Описание*
					</div>
					<textarea
						class="create-product__form-textarea"
						placeholder="Подумайте, какие подробности вы хотели бы узнать из объявления. И добавьте их в описание"
						v-model="v$.product.description.$model"
						:class="{ 'create-product__form-textarea-error': v$.product.description.$error }"
					></textarea>
					<div class="create-product__form-hint">Напишите еще 80 символов</div>
				</div>
			</div>
			<div class="create-product__form-block create-product__form-block-price d-flex">
				<div class="create-product__form-block-error">{{ errors.price }}</div>
				<div class="create-product__form-block-item">
					<div class="create-product__form-label">
						Цена
					</div>
					<input
						class="create-product__form-field create-product__form-field-price"
						placeholder="12 000"
						v-model="product.price"
					/>
				</div>
				<div class="create-product__form-block-item create-product__form-block-item-negotiable d-flex align-items-center">
					<div class="create-product__form-label create-product__form-label-inline">
						Договорная
					</div>
					<div
						class="create-product__form-switch"
						@click="product.price_negotiable = !product.price_negotiable"
					>
						<div
							class="create-product__form-switch-position"
							:class="{
								'create-product__form-switch-position-on': product.price_negotiable,
								'create-product__form-switch-position-off': !product.price_negotiable,
							}"
						></div>
					</div>
				</div>
			</div>
			<div class="create-product__form-block create-product__form-block-location">	
				<div class="create-product__form-block-error">{{ errors.location }}</div>				
				<div class="create-product__form-block-item">
					<div class="create-product__form-label">
						Местоположение
					</div>
					<div
						class="create-product__form-select create-product__form-select-location"
					>
						<div
							class="create-product__form-select-field d-flex justify-content-between align-items-center"
						>
							<input
								class="create-product__form-select-field-input" placeholder="Выберите"
								v-model="searchLocation"
								@keyup="getLocations"
							/>
							<img class="create-product__form-select-field-location" :src="require('@/assets/images/location.png')">
						</div>
						<div
							v-show="showLocations"
							class="create-product__form-select-menu"
						>
							<div
								v-for="(location, index) of locations"
								:key="index"
								class="create-product__form-select-menu-item"
								@click="selectLocation(location)"
							>{{ location.city }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="create-product__form-block create-product__form-block-contacts">
				<div class="create-product__form-block-error">{{ errors.person || errors.email || errors.phone }}</div>
				<div class="create-product__form-block-item">
					<div class="create-product__form-label">
						Контактная информация
					</div>
					<div class="create-product__form-inputs d-flex flex-column">
						<input class="create-product__form-field" placeholder="Контактное лицо*" v-model="contact.person" />
						<input class="create-product__form-field" placeholder="Email-адрес" v-model="contact.email" />
						<input
							class="create-product__form-field"
							placeholder="Номер телефона"
							v-model="contact.phone"
							v-maska
							data-maska="['+7 (7##) ###-##-##']"
							@maska="onMaska"
						/>						
					</div>
				</div>
			</div>
		</div>
		<div class="create-product__form-bottom d-flex justify-content-between align-items-center">
			<div class="create-product__form-block-error create-product__form-block-error-save">{{ errors.save }}</div>
			<div class="create-product__form-limitation d-flex align-items-center">
				<div class="create-product__form-limitation-option">Без ограничения</div>
				<div
					class="create-product__form-switch"
					@click="noLimitation = !noLimitation"
				>
					<div
						class="create-product__form-switch-position"
						:class="{
							'create-product__form-switch-position-on': noLimitation,
							'create-product__form-switch-position-off': !noLimitation,
						}"
					></div>
				</div>
				<div class="create-product__form-limitation-description">Публикация без окончания срока</div>
			</div>
			<div class="create-product__form-buttons d-flex justify-content-end align-items-center">
				<button
					type="button"
					class="create-product__form-button-publish"
					@click="onSubmit('moderating')"
				>Публикация</button>
				<button
					type="button"
					class="create-product__form-button-preview"
					@click="onSubmit('draft')"
				>Предпросмотр</button>
			</div>
		</div>
	</form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import errorMessages from './errorMessages'
import { ref } from 'vue'
import { vMaska } from "maska"

export default {
	setup () {
		const addImageRefs = ref([])
		return { v$: useVuelidate(), addImageRefs }
	},
	directives: { maska: vMaska },
	data () {
		return {
			product: {
				id: null,
				user_id: null,
				name: '',
				description: '',
				price: 0,
				price_negotiable: true,
				location_id: 0,
				status: '',
			},
			contact: {
				person: '',
				email: '',
				phone: '',
			},
			cats: [
				{
					level: 1,
					id: 0,
					name: 'Не выбрано',
					list: [],
					show: false
				}
			],
			imgs: [],
			searchLocation: '',
			locations: [],
			showLocations: false,
			phoneEntered: false,
			noLimitation: true,
			errors: {}
		}
	},
	validations () {
		return {
			product: {
				name: {
					required: helpers.withMessage(errorMessages.required.replace(':field', 'Название'), required),
					minLength: helpers.withMessage(errorMessages.minLength.replace(':length', '3'), minLength(3))
				},
				description: {
					required: helpers.withMessage(errorMessages.required.replace(':field', 'Описание'), required),
					minLength: helpers.withMessage(errorMessages.minLength.replace(':length', '8'), minLength(8))
				}
			},
			contact: {
				person: {
					minLength: helpers.withMessage(errorMessages.minLength.replace(':length', '3'), minLength(3))					
				},
				email: {
					email: helpers.withMessage(errorMessages.email, email)
				}
			}
		}
	},
	computed: {
		...mapState('catalog', ['mainCategories']),
	},
	async mounted () {
		this.resetErrors()
		await this.$store.dispatch('catalog/getMainCategories')
		this.cats[0].list = this.mainCategories
		for (let i = 1; i <= 8; i++) {
			this.imgs.push({
				num: i,
				active: i === 1,
				imageData: null,
				name: null,
				file: null
			})
		}
	},
	methods: {
		...mapActions('catalog', ['getChildCategories']),
		...mapActions('location', ['searchLocations']),
		...mapActions('product', ['saveProduct']),
		async selectCategory (category, level) {
			let cat = this.cats.find(item => item.level == level)
			cat.id = category.id
			cat.name = category.name
			cat.show = false
			if (level < this.cats.length) {
				this.cats.splice(level, this.cats.length - level)
			}
			const childCategories = await this.getChildCategories(category.id)
			if (childCategories.length != 0) {
				this.cats.push({
					level: level + 1,
					id: 0,
					name: 'Не выбрано',
					list: childCategories,
					show: false
				})
			}
		},
		selectImage(img, index) {
			if (img.active) {
				this.addImageRefs[index].click()
			}
		},
		onImageSelected(e, index) {
			var images = e.target.files;
			// console.log(images);
			if (images && images[0]) {
				const reader = new FileReader
				reader.onload = e => {
					this.imgs[index].imageData = e.target.result
				}
				reader.readAsDataURL(images[0])
				// this.$emit('input', images[0])
				this.imgs[index].active = false
				this.imgs[index].name = images[0].name
				this.imgs[index].file = images[0]
				if (this.imgs[index + 1]) {
					this.imgs[index + 1].active = true
				}
				// console.log(this.imgs)
			}
		},
		async getLocations () {
			if (this.searchLocation) {
				this.locations = await this.searchLocations(this.searchLocation)
				this.showLocations = this.locations.length != 0
			}
		},
		selectLocation (location) {
			this.selectedLocation = location
			this.searchLocation = location.city
			this.product.location_id = location.id
			this.showLocations = false
		},
		onMaska (event) {
			this.phoneEntered = event.detail.completed
		},
		async onSubmit (status) {
			this.resetErrors()
			const categories = this.cats.filter(item => item.id !== 0).map(item => {
				const { level, id, name } = item
				return { level, id, name }
			})
			if (categories.length == 0) {
				this.errors.category = errorMessages.category
				return
			}
			this.v$.$validate()
			if (!this.v$.$error) {
				if (this.product.price == 0 && !this.product.price_negotiable) {
					this.errors.price = errorMessages.price
					return
				}
				if (this.product.location_id == 0) {
					this.errors.location = errorMessages.location
					return
				}
				if (this.contact.phone && !this.phoneEntered) {
					this.errors.phone = errorMessages.phone
					return
				}
				this.product.status = status
				const images = this.imgs.filter(item => item.file !== null).map(item => {
					const { num, file } = item
					return { num, file }
				})
				const payload = {
					...this.product,
					...{ contact: this.contact },
					...{ categories },
					...{ images }
				}
				// console.log(payload)
				const saveResult = await this.saveProduct(payload)
				console.log(saveResult)
				if (!saveResult.success) {
					this.errors.save = errorMessages.saveProductError
				}
			}
			else {
				this.getErrorMessage()
			}
		},
		getErrorMessage () {
			if (this.v$.$errors.length != 0) {
				this.errors[this.v$.$errors[0].$property] = this.v$.$errors[0].$message
			}
		},
		resetErrors () {
			this.errors = {
				name: null,
				category: null,
				description: null,
				price: null,
				location: null,
				person: null,
				email: null,
				phone: null,
				save: null,
			}
		}
	}
}
</script>
