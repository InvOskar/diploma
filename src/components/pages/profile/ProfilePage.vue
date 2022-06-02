<template>
    <div class="profile">
        <div class="main-info">
            <div></div>
        </div>
        <div class="lessons-list"></div>
        <div class="articles-list"></div>
    </div>
</template>

<script>
import UserService from '../../../services/user.service'

const userService = new UserService();

export default {
    data() { 
        return{
            userId: this.$route.params.id,
            user: {},
        }
    },
    mounted(){
        userService.getUserById(this.userId).then((res) => {
            this.user = res;
        });
    }

}
</script>

<style>

</style>