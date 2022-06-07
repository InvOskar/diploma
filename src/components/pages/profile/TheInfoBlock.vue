<template>
    <div class="block">
        <!-- <div class="img">
            <img src="@/assets/images/noImage.png">
        </div> -->
        <p class="title">{{ user.firstName }} {{ user.lastName }}</p>
        <div class="rating">
            <rating-bar :rating="+user.rating"></rating-bar>
        </div>
        <div class="underline">
            {{ content.email }}: 
            <div :contenteditable="isContenteditable()" 
                @input="updateEmail($event.target.innerHTML)"
                v-html="user.email">
            </div>
        </div>
        <div class="underline" v-if="user.dateOfBirth!=null">
            {{ content.dateOfBirth }}: {{ user.dateOfBirth.split("-").reverse().join(".") }}
        </div>
        <div class="underline">
            {{ content.workExperience}}: 
            <div :contenteditable="isContenteditable()" 
                @input="updateWorkExperience($event.target.innerHTML)"
                v-html="user.workExperience">
            </div>
            {{ content.years }}
        </div>
        <div class="underline">
            {{ content.currentWork}}: 
            <div :contenteditable="isContenteditable()" 
                @input="updateCurrentWork($event.target.innerHTML)"
                v-html="user.currentWork">
            </div>
        </div>
        <div class="textarea" 
            :contenteditable="isContenteditable()" 
            @input="updateDetailInfo($event.target.innerHTML)" 
            :data-text="`${ content.info }`"
            v-html="user.detailInfo">
        </div>
        <div class="save" @click="save" v-if="isAuthor">{{ content.save }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RatingBar from './RatingBar.vue'
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
            isAuthor: false,
        }
    },

    methods: {
        isContenteditable(){
            if(this.isAuthor){
                return true;
            }
            return false;
        },
        checkIsAuthor(){
            if(this.isSignedUp){
                userService.getAuthUser().then(res => {
                    let user = res;

                    if(user._id === this.user._id){
                        this.isAuthor = true;
                    }
                });
            }
        },
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
        this.newUser = {...this.user };
        this.checkIsAuthor();
    },

    computed: {
        ...mapGetters(['getLanguage', 'isSignedUp'])
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

    display: flex;
    flex-direction: column;
    justify-content: center;
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
.save{
    font-size: 20px;

    background-color: #50BE95;
    color: white;

    padding: 5px;
    float: right;

    cursor: pointer;
}
</style>