<template>
    <div class="signIn">
      <h1>{{ content.header }}</h1>
      <the-input-form :width="'30%'">
        <main-label>{{ content.email }}:</main-label>
        <main-input v-model="email" />
        <main-label>{{ content.password }}:</main-label>
        <main-input type="password" v-model="password" />
        <main-button @click="login" :width="'150px'" :mt="'30px'">{{ content.signIn }}</main-button>
        <div class="shadow-line">
          <p>{{ content.forgotPassword }}</p>
          <p>{{ content.signUp }}</p>
        </div>
        {{error}}
      </the-input-form>
    </div>
</template>

<script>
import MainInput from '../UI/MainInput.vue'
import { signInText } from './SignIn'
import { mapGetters } from 'vuex'
import TheInputForm from '../TheInputForm.vue'
import MainButton from '../UI/MainButton.vue'
import MainLabel from '../UI/MainLabel.vue'
import axios from 'axios'

export default {
  components: { MainInput, TheInputForm, MainButton, MainLabel },
  data() {
    return {
      content: signInText.RU,
      email: '',
      password: '',
      error: '',
    }
  },

  methods: {
    login(){
      let user = {
        email: this.email,
        password: this.password,
      }
      axios.post('http://localhost:5000/login', user)
        .then(res => {
          if(res.status === 200) {
            localStorage.setItem('token', res.data.token)
            // this.$store.dispatch('setUser', res.data.user)
            this.$router.push('/')
            
          }
        })
        .catch(err => {
          this.error = err.response.data.error;
        })
    }
  },

  computed: {
    ...mapGetters(['getLanguage'])
  },

  watch: {
    getLanguage(newLang) {
      this.content = signInText[newLang];
    }
  }

}
</script>

<style lang="scss" scoped>
.signIn{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    gap: 50px;

    margin-top: 40px;
}

.shadow-line{
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    width: 100%;

    margin-top: 20px;

    &>p{
        font-size: 16px;
        line-height: 20px;
        color: grey;

        &:hover{
            cursor: pointer;
            color: #50BE95;
        }
    }
}
</style>