<template>
    <div class="__page-block">
        <h1>{{ content.header }}</h1>
        <the-input-form :width="width" :height="height">
          <div class="error">
            <p>{{ error }}</p>
          </div>
          <div class="form">
            <div class="part">
              <main-label>{{ content.email }}:</main-label>
              <main-input type="email" v-model="user.email"/>
            </div>
            <div class="part">
              <main-label>{{ content.firstName }}:</main-label>
              <main-input type="text" v-model="user.firstName" />
            </div>
            <div class="part">
              <main-label>{{ content.lastName }}:</main-label>
              <main-input v-model="user.lastName"/>
            </div>
            <div class="part">
              <main-label>{{ content.dateOfBirth }}:</main-label>
              <main-input type="date" v-model="dateOfBirth"/>
            </div>
            <div class="part">
              <main-label>{{ content.workExperience }}:</main-label>
              <main-input :width="'100px'" type="text" v-model="user.workExperience"/>
            </div>
            <div class="part">
              <main-label>{{ content.currentWork }}:</main-label>
              <main-input v-model="user.currentWork"/>
            </div>
            <div class="part">
              <main-label>{{ content.password }}:</main-label>
              <main-input type="password" v-model="user.password"/>
            </div>
            <main-button @click="signUp()" :width="'300px'">{{ content.signUp }}</main-button>
          </div>
        </the-input-form>
    </div>
</template>

<script>
import TheInputForm from './TheInputForm.vue';
import { signUpText } from './SignUp'
import { mapGetters } from 'vuex'
import MainRadioInput from '../../UI/MainRadioInput.vue'
import MainLabel from '../../UI/MainLabel.vue'
import MainInput from '../../UI/MainInput.vue'
import MainButton from '../../UI/MainButton.vue'
import AuthService from '../../../services/auth.service';

const authService = new AuthService();

export default {
  components: { TheInputForm, MainRadioInput, MainLabel, MainInput, MainButton },

  data() {
    return {
      content: signUpText.RU,
      width: '70%',
      height: '750px',
      user :{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        currentWork: "",
        workExperience: "",
      },
      dateOfBirth: "",
      error: '',
    }
  },

  methods: {
    signUp(){
      if(this.checkErrors()){
        let date = this.dateOfBirth.split('-').reverse().join('-');
        authService.register({...this.user, dateOfBirth: date}).then((res) => {
            this.$router.push('/signIn');
        });
      }
    },

    checkData(){
      if(this.user.email === '' || this.user.password === '' || this.user.firstName === '' || this.user.lastName === '' || this.user.dateOfBirth === '' || this.user.currentWork === '' || this.user.workExperience === ''){
        this.error = 'Fill in all the fields';
        return false;
      }
      return true;
    },

    isItEmail(){
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(reg.test(this.user.email) === false){
        this.error = 'Enter a valid email address';
        return false;
      }
      return true;
    },

    isItDateOfBirth(){
      let reg = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
      if(reg.test(this.dateOfBirth) === false){
        this.error = 'Enter a valid date of birth';
        return false;
      }
      return true;
    },

    isItStrongPassword(){
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if(reg.test(this.user.password) === false){
        this.error = 'Enter a strong password';
        return false;
      }
      return true;
    },

    isItNumber(){
      let reg = /^[0-9]+$/;
      if(reg.test(this.user.workExperience) === false){
        this.error = 'Enter a number';
        return false;
      }
      return true;
    },

    isItValidName(){
      let reg = /^[a-zA-Zа-яА-Я]+$/;
      if(reg.test(this.user.firstName) === false || reg.test(this.user.lastName) === false){
        this.error = 'Enter a valid name';
        return false;
      }
      return true;
    },

    checkErrors(){
      if(this.checkData && this.isItEmail() && this.isItDateOfBirth() && this.isItStrongPassword() && this.isItNumber() && this.isItValidName()){
        return true;
      }
      return false;
    },
  },

  computed: {
    ...mapGetters(['getLanguage'])
  },

  watch: {
    getLanguage(newLang) {
      this.content = signUpText[newLang];
    },
    
    error(newVal){
      if(newVal!=''){
        setTimeout(() => {
          this.error = '';
        }, 4000);
      }
    },

    dateOfBirth(newVal){
      if(newVal!=''){
        this.dateOfBirth = newVal.split('-').reverse().join('-');
      }
    },

  }
}
</script>

<style lang="scss" scoped>
.part{
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  gap: 20px;
}
.form{
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 40px;
}
</style>