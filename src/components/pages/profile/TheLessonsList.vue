<template>
    <div class="block scrollX">
        <p class="title">Список Уроков</p>
        <div class="card-list" >
            <plus-button
                :width="'50px'" :height="'50px'" 
                @click="$router.push('/lesson/create')"/>
        </div>
    </div>
</template>

<script>
import PlusButton from '../../UI/PlusButton.vue'

export default {
    components: { PlusButton },
}
</script>

<style lang="scss" scoped>
.block{
    width: 1000px;
    height: 420px;

    border-radius: 30px;

    display: flex;
    flex-direction: column;

    box-shadow: 0px 7px 35px rgba(80, 190, 149, 0.5);
}
.card-list{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    margin-left: 30px;
    gap: 30px;
}
.center{
    justify-content: center;
    height: 230px;
}
.title{
    font-size: 24px;
    font-weight: bold;

    padding: 15px;
}
.no-articles{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    
    height: 100%;
}
</style>