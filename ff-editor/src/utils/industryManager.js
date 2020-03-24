// This file will be used to store the application state
import Vuex from 'vuex';
import Vue from 'vue';
import { generateNewCardStore } from './cardManager';

Vue.use(Vuex);

function generateIndustry() {
  return new Vuex.Store({
    state: {
      color: '#fff',
      active: false,
      name: 'Industry Name',
      id: `_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      cardStore: generateNewCardStore(),
    },
    mutations: {
      setColor(state, color) {
        state.color = color;
      },
      setName(state, name) {
        state.name = name;
      },
    },
  });
}

const industryStore = new Vuex.Store({
  state: {
    industries: [],
    selected: null,
  },
  mutations: {
    add(state) {
      state.industries.push(generateIndustry());
    },
    select(state, industry) {
      state.selected = industry;
      state.industries.forEach((ind) => {
        const thisIndustry = ind;
        thisIndustry.active = false;
      });
      state.selected.active = true;
    },
  },
});

export default industryStore;
