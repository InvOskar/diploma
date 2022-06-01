<template>
    <div class="signUp">
        <h1>{{ content.header }}</h1>
        <the-input-form :width="width" :height="height">
          <div class="choose">
            <div>
              <input class="radio-input" type="radio" name="choose" value="teacher" v-model="role"/> 
              <main-label :fs="'28px'">{{ content.teacher }}</main-label>
            </div>
            <div>
              <input class="radio-input" type="radio" name="choose" value="student" v-model="role"/> 
              <main-label :fs="'28px'">{{ content.student }}</main-label>
            </div>
          </div>
          <div class="form" v-if="role!=''">
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
              <main-label>{{ content.dataOfBirth }}:</main-label>
              <main-input type="date" v-model="user.dataOfBirth"/>
            </div>
            <div class="part" v-if="role=='teacher'">
              <main-label>{{ content.workExperience }}:</main-label>
              <div>
                <main-input :width="'100px'" type="text" v-model="teacher.workExperience"/>
                <main-label style="padding-left: 10px;">{{ content.year }}</main-label>
              </div>
            </div>
            <div class="part" v-else-if="role=='student'">
              <main-label>{{ content.grade }}:</main-label>
              <select v-model="student.grade">
                <option v-for="number in 12" :key="number">{{ number }}</option>
                <option>{{ content.student }}</option>
              </select>
            </div>
            <div class="part" v-if="role=='teacher'">
              <main-label>{{ content.currentWork }}:</main-label>
              <main-input v-model="teacher.currentWork"/>
            </div>
            <div class="part" v-else-if="role=='student'">
              <main-label>{{ content.school }}:</main-label>
              <main-input v-model="student.school"/>
            </div>
            <div class="part">
              <main-label>{{ content.password }}:</main-label>
              <main-input type="password" v-model="user.password"/>
            </div>
            <main-button @click="signUp()" :width="'300px'">{{ content.signUp }}</main-button>
            {{ error }}
          </div>
        </the-input-form>
    </div>
</template>

<script>
import axios from 'axios';
import TheInputForm from '../TheInputForm.vue';
import { signUpText } from './SignUp'
import { mapGetters } from 'vuex'
import MainRadioInput from '../UI/MainRadioInput.vue'
import MainLabel from '../UI/MainLabel.vue'
import MainInput from '../UI/MainInput.vue'
import MainButton from '../UI/MainButton.vue'

export default {
  components: { TheInputForm, MainRadioInput, MainLabel, MainInput, MainButton },
  data() {
    return {
      content: signUpText.RU,
      role: "",
      width: '50%',
      height: '300px',
      user :{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dataOfBirth: "",
      },
      student : {
        grade: "",
        school: "",
      },
      teacher : {
        currentWork: "",
        workExperience: "",
      },
      error: '',
    }
  },
  methods: {
    signUp(){
      let newUser = this.role === 'teacher' ? 
        {...this.user, ...this.teacher, role: this.role} : {...this.user, ...this.student, role: this.role};
      axios.post('http://localhost:5000/signup', newUser)
        .then(res => {
          this.error = '';
          this.$router.push('/signIn');
        }, err => {
          this.error = err.response.data.error;
        })
    }
  },

  computed: {
    ...mapGetters(['getLanguage'])
  },
  watch: {
    getLanguage(newLang) {
      this.content = signUpText[newLang];
    },
    role(newRole) {
      if (newRole != ''){
        this.width = '70%';
        this.height = '750px';
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
select{
  border: none;
  outline: none;
  background: transparent;
  border-bottom: 3px solid #50BE95;
  border-right: 3px solid #50BE95;

  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;

  padding: 8px;
  box-shadow: 2px 2px 6px grey;
  font-size: 18px;
  cursor: pointer;
}
</style>