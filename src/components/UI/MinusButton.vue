<template>
    <button :style="{ width: width, height: height }">
        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm4.253 7.75h-8.5c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z" fill-rule="nonzero"/>
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
    fill: #f80b0b;

    width: 100%;
    height: 100%;

    &:hover{
        fill: #8f0a0a;
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