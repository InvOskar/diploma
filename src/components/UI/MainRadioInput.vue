<template>
    <input type="radio" >
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 2px solid #2F4858;
  transition: 0.2s all linear;
  outline: none;
    
  cursor: pointer;

}
input:checked {
  border: 6px solid #50BE95;
}
</style>