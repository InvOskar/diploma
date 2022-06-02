<template>
    <button :style="{ width: width, height: height }">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/>
        </svg>
    </button>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: '30px',
        },
        height: {
            type: String,
            default: '30px',
        },
    }
}
</script>

<style lang="scss" scoped>
button {
    border-radius: 50%;
    border: 0;
    outline: 0;
    background: transparent;

    &:hover{
        animation: pulse 1s infinite;
    }
}
svg{
    fill: #50BE95;

    width: 100%;
    height: 100%;

    &:hover{
        fill: #1E7683;
        cursor: pointer;
    }
}
@keyframes pulse { 
    0% { 
        transform: scale(1); 
    } 
    50% { 
        transform: scale(1.1); 
    } 
    100% { 
        transform: scale(1); 
    } 
}
</style>