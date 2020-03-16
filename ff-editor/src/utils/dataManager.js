// This file will be used to store the application state
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentCard: null,
    industry: 'Hello World',
    value: 5,
    schematic: new Array(9).fill(0),
  },
  mutations: {
    setCard(state, card) {
      state.currentCard = card;
    },
    setIndustry(state, msg) {
      state.industry = msg;
    },
    setValue(state, val) {
      state.value = parseInt(val, 0) || 0;
    },
  },
});

export default store;
