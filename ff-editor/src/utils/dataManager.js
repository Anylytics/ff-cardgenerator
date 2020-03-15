// This file will be used to store the application state
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    industry: 'Hello World',
    value: 5,
  },
  mutations: {
    increment(state) {
      state.count += 1;
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
