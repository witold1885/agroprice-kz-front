<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content}` : `${siteName}` }}</template>
    <template v-slot:description="{ content }">{{ content }}</template>
    <template v-slot:keywords="{ metaInfo }">{{ metaInfo.content }}</template>
  </metainfo>
  <div id="main-container">
    <Header />
    <router-view />    
  </div>
  <Footer />
  <AuthDialog
    :dialog="authDialog"
    @login="afterLogin"
    @register="infoRegister"
    @forgot="initForgot"
  />
  <ForgotDialog :dialog="forgotDialog" @forgot="infoForgot"/>
  <InfoDialog :dialog="infoDialog" />
</template>

<script>
import { SITE_NAME } from '@/constants'
import { useMeta } from 'vue-meta'
import { mapState } from 'vuex'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import AuthDialog from '@/components/Auth/AuthDialog'
import ForgotDialog from '@/components/Auth/ForgotDialog'
import InfoDialog from '@/components/Auth/InfoDialog'

export default {
  setup () {
    useMeta({
      title: 'Сельхозтехника в Казахстане Сельскохозяйственная техника на Agroprice.kz',
      description: 'Сельскохозяйственная техника, купить сельхозтехнику в Казахстане Алматы Астана Костанай Шымкент Петропавловск Караганда Кокшетау продажа на Agroprice.kz Агропрайс',
      meta: [
        { name: 'keywords', content: 'сельхозтехника, сельскохозяйственная техника, казахстан, алматы, астана, agroprice, агропрайс, костанай, шымкент, петропавловск, караганда, кокшетау'},
      ],
      htmlAttrs: { lang: 'ru', amp: true }
    })
  },
  components: {
    Header,
    Footer,
    AuthDialog,
    ForgotDialog,
    InfoDialog
  },
  data () {
    return {
      authDialog: {
        visible: false,
        name: 'login'
      },
      infoDialog: {
        visible: false,
        message: ''
      },
      forgotDialog: {
        visible: false,
        message: ''
      },
      redirect: '/'
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    siteName () {
      return SITE_NAME
    }
  },
  async mounted() {
    await this.$store.dispatch('auth/getUser')
    this.emitter.on('auth', (redirect = '/') => {
      this.authDialog.visible = true
      this.redirect = redirect
    })
  },
  methods: {    
    afterLogin () {
      this.authDialog.visible = false
      this.$router.push(this.redirect)
    },
    infoRegister () {
      this.authDialog.visible = false
      this.infoDialog.message = 'Регистрация прошла успешно. Письмо с ссылкой для подтверждения отправлено на Ваш E-mal'
      this.infoDialog.visible = true
    },
    initForgot () {
      this.authDialog.visible = false
      this.forgotDialog.visible = true
    },
    infoForgot () {
      this.forgotDialog.visible = false
      this.infoDialog.message = 'Запрос на восстановление пароля создан успешно. Письмо с ссылкой для подтверждения отправлено на Ваш E-mal'
      this.infoDialog.visible = true
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/app.scss';
@import '@/assets/styles/common.scss';
</style>
