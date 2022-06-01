import { createStore } from 'vuex'

export default createStore({
  state: {
    language: 'RU',
    isLesson: false,
    isSignedUp: false,
  },
  getters: {
    getLanguage: state => state.language,
    isLesson: state => state.isLesson,
    isSignedUp: state => state.isSignedUp,
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language;
    },
    setIsLesson(state, isLesson) {
      state.isLesson = isLesson;
    },
    setIsSignedUp(state, isSignedUp) {
      state.isSignedUp = isSignedUp;
    },
  },
  actions: {
    setLanguage({commit}, language) {
      commit('setLanguage', language);
    },
    setIsLesson({commit}, isLesson) {
      commit('setIsLesson', isLesson);
    },
    setIsSignedUp({commit}, isSignedUp) {
      commit('setIsSignedUp', isSignedUp);
    },
  },
  modules: {
  }
})
