<template>
  <div class="main-wrapper" :style="{ transform: 'scale(' + ratio + ') translate(-50%, -50%)' }">
    <lesson-view v-if="isLesson" />
    <main-view v-else />
  </div>
</template>

<script>
import MainView from "./views/MainView.vue";
import LessonView from "./views/LessonView.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    MainView,
    LessonView
  },

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
</style>
