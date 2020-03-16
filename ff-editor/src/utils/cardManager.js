// This file will be used to store the application state
import Vuex from 'vuex';
import Vue from 'vue';
import colorTools from './colorTools';

Vue.use(Vuex);

function generateNewCard() {
  return new Vuex.Store({
    state: {
      product: 'Product Name',
      industry: 0,
      id: `_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      industry_color: '',
      value: 2,
      schematic: new Array(9).fill(-1),
      schematic_color: new Array(9).fill('#fff'),
    },
    mutations: {
      setProductName(state, val) {
        state.product = val;
      },
      setIndustry(state, val) {
        state.industry = val;
        state.industry_color = colorTools.colorMap[val] || '#fff';
      },
      setValue(state, val) {
        state.value = parseInt(val, 0) || 0;
      },
      setSchematic(state, data) {
        const val =
          data.value || colorTools.genNextIndex(state.schematic[data.id]);
        state.schematic[data.id] = val;
        state.schematic_color[data.id] =
          colorTools.getColorMap()[val] || '#fff';
      },
    },
  });
}

const cardStore = new Vuex.Store({
  state: {
    cards: [],
  },
  mutations: {
    addCard(state) {
      state.cards.push(generateNewCard());
    },
  },
});

cardStore.commit('addCard');

export default cardStore;
