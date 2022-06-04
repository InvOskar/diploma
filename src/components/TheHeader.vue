<template>
    <div class="main_header">
        <div class="logo" @click="$router.push('/')">
            ITeacher
        </div>
        <div class="menu">
            <div v-for="(item, index) in headerText.headerMenu" :key="index">
                <p @click="goToPage(index)">{{ item }}</p>
            </div>
            <div>
                <p v-if="!isSigned" @click="$router.push('/signIn')">{{ headerText.optionalMenu[1][0] }}</p>
                <p v-if="!isSigned" @click="$router.push('/signUp')">{{ headerText.optionalMenu[1][1] }}</p>

                <p v-if="isSigned" @click="$router.push('/profile/' + 1)">{{ headerText.optionalMenu[0][0] }}</p>
                <p v-if="isSigned" @click="logout()">{{ headerText.optionalMenu[0][1] }}</p>
            </div>
        </div>
        <div class="lang-switch">
            <div class="current" @click="openLangMenu()">
                {{ getLanguage }} 
                <img ref="arrow" src="@/assets/svg/arrow.svg" alt="arrow">
            </div>
            <div class="lang-module" v-if="langMenu">
                <img class="ar" src="@/assets/svg/polygon.svg" alt="polygon">
                <div class="langs" v-for="item in lang" :key="item" 
                :class="{selected: getLanguage==item}" 
                @click="changeLanguages(item)">
                    <p>{{ item }}</p> <img :src="require(`@/assets/images/${item}.png`)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { headerText } from './TheHeader.js'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            headerText: headerText.RU,
            langMenu: false,
            lang: ['RU', 'KZ', 'EN'],
            pages: ['/articles', '/teachers', '/lessons', '/students'],
            isSigned: false,
        }
    },

    methods: {
        ...mapActions(['setLanguage', 'setIsSignedUp']),

        openLangMenu(){
            let arrow = this.$refs.arrow;
            this.langMenu = !this.langMenu;

            if(this.langMenu){
                arrow.style.transform = 'rotate(-180deg)';
                arrow.style.transition = '0.5s';
            } else {
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.transition = '0.5s';
            }
        },

        logout(){
            localStorage.removeItem('token');
            this.setIsSignedUp(false);
            this.$router.push('/');
        },
         
        changeLanguages(lang){
            this.setLanguage(lang);
            this.openLangMenu();
        },

        goToPage(index){
            this.$router.push(this.pages[index]);
        },
    },

    computed: {
        ...mapGetters(['getLanguage', 'isSignedUp']),
    },

    watch: {
        getLanguage(newLang){
            this.headerText = headerText[newLang];
        },
        isSignedUp(newVal){
            this.isSigned = newVal;
        }
    },

    created(){
        if(localStorage.getItem('token')!=null){
            this.setIsSignedUp(true);
        }
    },
}
</script>

<style lang="scss" scoped>
.main_header {
    height: 100px;
    width: 75%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-weight: 500;
    font-size: 22px;
    line-height: 22px;
}
.logo{
    width: 40%;

    font-weight: 700;
    font-size: 32px;

    &:hover{
        cursor: pointer;
    }
}
.menu {
    display: flex;
    align-items: center;
    height: 100%;

    &>div {
        display: flex;
    }

    &>div>p{
        padding: 0 20px;

        &:hover{
            color: #50BE95;
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
.current {
    display: flex;
    align-items: center;

    font-weight: 700;
    font-size: 20px;
    line-height: 20px;

    &:hover{
        cursor: pointer;
    }
}
.lang-module{
    height: 97px;
    width: 100px;

    border-radius: 9px;

    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    position: absolute;

    margin-top: 16px;
    margin-left: -30px;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;

    &>div:hover{
        cursor: pointer;
    }

    &>.selected{
        color: #50BE95;
    }
}
.ar{
    position: absolute;
    top: -8px;
    pointer-events: none;
}
.langs{
    width: 100%;
    height: 33%;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
</style>