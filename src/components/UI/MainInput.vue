<template>
    <input v-model="modelValue" :style="{width:width}"/>
</template>

<script>
export default {
    emits: ["update:modelValue"],
    props: {
        width: {
            type: String,
            default: "350px",
        },
    },
    data() {
        return {
            modelValue: ""
        };
    },
    watch: {
        modelValue: function(newValue, oldValue){
            this.$emit("update:modelValue", this.modelValue);
        }
    }
}
</script>

<style lang="scss" scoped>
input{
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
}
</style>