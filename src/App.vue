<template>
  <div class="main-wrapper" :style="{ transform: 'scale(' + ratio + ') translate(-50%, -50%)' }">
    <main-view />
  </div>
</template>

<script>
import MainView from "./views/MainView.vue";
import { mapGetters } from "vuex";

export default {
  components: { MainView },

  data() {
    return {
      ratio: 1,
    };
  },

  methods: {
    resize: function () {
      var sw = 1920;
      var sh = 1080;
      var factor = sw / sh;
      var bw = window.innerWidth;
      var bh = window.innerHeight;

      if (bw / bh < factor) {
        this.ratio = bw / sw;
      } else {
        this.ratio = bh / sh;
      }
    },

    unmounted() {
      window.removeEventListener("resize", this.resize);
    },
  },

  created() {
    window.addEventListener("resize", this.resize);
    this.resize();
  },

  computed: {
    ...mapGetters(['isLesson'])
  },
};

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #2F4858;
  font-family: 'Nunito', sans-serif;
}

.main-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1920px;
  height: 1080px;
  transform-origin: 0 0;
  overflow: hidden;
}

img {
  pointer-events: none;
}

.error>p{
  color: red;
  font-size: 22px;
  animation: fadeIn 2s infinite linear;
}
@keyframes fadeIn {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}

.scrollX{
  overflow-y: hidden;
  overflow-x: scroll;
}
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}
::-webkit-scrollbar
{
	width: 8px;
	background-color: #F5F5F5;
}
::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #50BE95;
}

.create{
    text-align: center;
}

.__page-block{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 50px;

    margin-top: 40px;
}

.empty-text {
    font-size: 30px;
    text-align: center;
    font-weight: bold;
}

input, textarea{
    &::placeholder{
        font-style: italic;
    }
}

textarea{
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    outline: none;
    font-size: 20px;
    font-weight: 400;
    background: transparent;
    border-bottom: 3px solid #50BE95;
    border-right: 3px solid #50BE95;

    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;

    padding: 8px;
    box-shadow: 2px 2px 6px grey;
}
.paragraph{
    width: 90%;
    height: 300px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 20px;
}
</style>
