<template>
    <div class="signIn">
      <h1>{{ content.header }}</h1>
      <the-input-form :width="'30%'">
        <div class="error">
          <p>{{ error }}</p>
        </div>
        <main-label>{{ content.email }}:</main-label>
        <main-input v-model="email" />
        <main-label>{{ content.password }}:</main-label>
        <main-input type="password" v-model="password"></main-input>
        <main-button @click="login" :width="'150px'" :mt="'30px'">{{ content.signIn }}</main-button>
        <div class="shadow-line">
          <p>{{ content.forgotPassword }}</p>
          <p @click="$router.push('/signUp')">{{ content.signUp }}</p>
        </div>
      </the-input-form>
    </div>
</template>

<script>
import MainInput from '../../UI/MainInput.vue'
import { signInText } from './SignIn'
import { mapGetters, mapActions } from 'vuex'
import TheInputForm from '../../TheInputForm.vue'
import MainButton from '../../UI/MainButton.vue'
import MainLabel from '../../UI/MainLabel.vue'
import axios from 'axios'
import AuthService from '../../../services/auth.service'

const authService = new AuthService();

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
      if(this.checkData()){
        let user = {
          email: this.email,
          password: this.password,
        }
        authService.login(user)
          .then(res => {
              this.setIsSignedUp(true);
              this.$router.push('/');
          })
          .catch(err => {
            this.error = err;
          })
      }
    },

    checkData(){
      if(this.email === '' || this.password === ''){
        this.error = 'Fill in all the fields';
        return false;
      }
      return true;
    },

    ...mapActions(['setIsSignedUp']),
  },

  computed: {
    ...mapGetters(['getLanguage'])
  },

  watch: {
    getLanguage(newLang) {
      this.content = signInText[newLang];
    },
    error(newVal){
      if(newVal!=''){
        setTimeout(() => {
          this.error = '';
        }, 4000);
      }
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

.choose{
  display: flex;
  justify-content: space-evenly;

  gap: 70px;

  &>div{
    display: flex;
    gap: 20px;
    align-items: center;
  }
}
.radio-input{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 2px solid #2F4858;
  transition: 0.2s all linear;
  outline: none;
    
  cursor: pointer;

}
.radio-input:checked {
  border: 6px solid #50BE95;
}
</style>