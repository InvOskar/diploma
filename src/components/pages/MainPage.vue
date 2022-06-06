<template>
    <div class="main">
        <div class="content">
            <p class="pre_header">{{ content.preHeader }}</p>
            <p class="header">{{ content.headerText }}</p>
            <p class="shadow_text">{{ content.shadowText }}</p>
            <main-button :width="'220px'" :mt="'50px'">{{ content.buttonText }}</main-button>
        </div>
        <div class="photos">
            <img src="@/assets/images/chel1.png">
            <img src="@/assets/images/chel2.png">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mainPageText } from './MainPage.js'
import MainButton from '../UI/MainButton.vue'

export default {
    components: {
        MainButton
    },
    data(){
        return {
            content: mainPageText.RU,
        }
    },

    computed: {
        ...mapGetters(['getLanguage'])
    },

    watch: {
        getLanguage(newLang){
            this.content = mainPageText[newLang];
        }
    }
}
</script>

<style lang="scss" scoped>
.main{
    display: flex;
    align-items: center;
    justify-content: center;
}
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    width: 28%;
}
.pre_header{
    font-weight: 700;
    font-size: 28px;
    line-height: 36px;
    color: #50BE95;
    letter-spacing: -0.02em;
}
.header{
    font-weight: 900;
    font-size: 45px;
    line-height: 45px;
    
    margin-top: 20px;
}
.shadow_text{
    font-weight: 500;
    font-size: 24px;
    line-height: 116.82%;
    color: rgba(0, 0, 0, 0.5);

    margin-top: 40px;
}
.photos{
    &>:first-child{
        position: absolute;
        top: 213px;
        left: 72px;
    }
    &>:last-child{
        position: absolute;
        top: 283px;
        left: 1279px;
    }
}
</style>