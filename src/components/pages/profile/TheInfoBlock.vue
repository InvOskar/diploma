<template>
    <div class="block">
        <div class="img">
            <img src="@/assets/images/noImage.png">
        </div>
        <p class="title">{{ user.firstName }} {{ user.lastName }}</p>
        <div class="rating">
            <rating-bar :rating="+user.rating"></rating-bar>
        </div>
        <div class="underline">
            {{ content.email }}: 
            <div contenteditable="true" @input="updateEmail($event.target.innerHTML)">
                {{ user.email }}
            </div>
        </div>
        <div class="underline" v-if="user.dateOfBirth!=null">
            {{ content.dateOfBirth }}: {{ user.dateOfBirth.split('-').reverse().join('-') }}
        </div>
        <div class="underline">
            {{ content.workExperience}}: 
            <div contenteditable="true" @input="updateWorkExperience($event.target.innerHTML)">
                {{ user.workExperience }}
            </div>
            {{ content.years }}
        </div>
        <div class="underline">
            {{ content.currentWork}}: 
            <div contenteditable="true" @input="updateCurrentWork($event.target.innerHTML)">
                {{ user.currentWork }}
            </div>
        </div>
        <div class="textarea" contenteditable="true" @input="updateDetailInfo($event.target.innerHTML)" :data-text="`${ content.info }`">
            {{ user.detailInfo }}
        </div>
        <div class="save" @click="save">{{ content.save }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RatingBar from '../../RatingBar.vue'
import UserService from '../../../services/user.service'
import { profilePageText } from './ProfilePage'

const userService = new UserService();

export default {
  components: { RatingBar },
    props: {
        user: {
            type: Object,
            required: true,
        },
    },    

    data() {
        return {
            content: profilePageText.RU.infoBlock,
            newUser: {},
        }
    },

    methods: {
        updateEmail(str){
            this.newUser.email = str;
        },
        updateWorkExperience(str){
            this.newUser.workExperience = str;
        },
        updateCurrentWork(str){
            this.newUser.currentWork = str;
        },
        updateDetailInfo(str){
            this.newUser.detailInfo = str;
        },
        save(){
            userService.updateUser(this.newUser);
        },
    },

    updated() {
        this.newUser = {...this.user};
    },

    computed: {
        ...mapGetters(['getLanguage'])
    },

    watch: {
        getLanguage(newLang){
            this.content = profilePageText[newLang].infoBlock;
        }
    },
}
</script>

<style lang="scss" scoped>
[contentEditable=true]:empty:not(:focus):before{
    content:attr(data-text)
}
.block{
    width: 600px;
    height: 800px;

    box-shadow: 0px 7px 35px rgba(80, 190, 149, 0.5);

    border-radius: 30px;
}
.img{
    width: 100%;
    height: 300px;

    display: flex;
    justify-content: center;

    background-color: #F5F5F5;

    &>img{
        width: auto;
        height: 100%;
    }
}
.title{
    font-size: 30px;
    font-weight: bold;
    padding-top: 30px;
    padding-bottom: 30px;
    text-align: center;
}
.underline{
    display: flex;
    gap: 10px;
    font-size: 20px;
    padding: 10px;
    border-bottom: 2px solid #50BE95;
}
.rating{
    display: flex;
    justify-content: center;
    padding: 10px;
}
.textarea{
    width: 100%;
    max-height: 130px;

    padding: 10px;

    font-size: 20px;

    overflow-y: scroll;
}
.textarea::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

.textarea::-webkit-scrollbar
{
	width: 8px;
	background-color: #F5F5F5;
}

.textarea::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #50BE95;
}
.save{
    font-size: 20px;

    background-color: #50BE95;
    color: white;

    padding: 5px;
    float: right;

    cursor: pointer;
}
</style>