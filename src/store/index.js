import { createStore } from 'vuex'

export default createStore({
  state: {
    language: 'RU',
    isLesson: false,
  },
  getters: {
    getLanguage: state => state.language,
    isLesson: state => state.isLesson,
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language;
    },
    setIsLesson(state, isLesson) {
      state.isLesson = isLesson;
    }
  },
  actions: {
    setLanguage({commit}, language) {
      commit('setLanguage', language);
    },
    setIsLesson({commit}, isLesson) {
      commit('setIsLesson', isLesson);
    }
  },
  modules: {
  }
})
