<template>
    <div>
        {{ user.firstName }} {{ user.lastName }}
    </div>
</template>

<script>
import UserService from '../../services/user.service'

const userService = new UserService();

export default {
    data() { 
        return{
            user: {},
        }
    },
    mounted(){
        userService.getAuthUser().then((res) => {
            this.user = res;
        });
    }

}
</script>

<style>

</style>