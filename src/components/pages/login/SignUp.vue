<template>
    <div class="signUp">
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
import TheInputForm from '../../TheInputForm.vue';
import { signUpText } from './SignUp'
import { mapGetters, mapActions } from 'vuex'
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
    ...mapActions({
      setIsSignedUp: 'setIsSignedUp'
    }),

    signUp(){
      if(this.checkData()){
        let date = this.dateOfBirth.split('-').reverse().join('-');
        authService.register({...this.user, dateOfBirth: date}).then((res) => {
            this.setIsSignedUp(true);
            this.$router.push('/');
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
    }
  }
}
</script>

<style lang="scss" scoped>
.signUp{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    gap: 50px;

    margin-top: 40px;
}
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