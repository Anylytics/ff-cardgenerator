import Vuex from 'vuex';
import Vue from 'vue';
import colorTools from './colorTools';

Vue.use(Vuex);

const flatWhite = '#ecf0f1';

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
      schematic_color: new Array(9).fill(flatWhite),
    },
    mutations: {
      setProductName(state, val) {
        const maxLen = 26;
        const leadingSpaces = new Array((maxLen - val.length) / 2).fill(' ');
        state.product = leadingSpaces.join('') + val;
      },
      setIndustry(state, val) {
        state.industry = val;
        state.industry_color = colorTools.colorMap[val] || flatWhite;
      },
      setValue(state, val) {
        state.value = parseInt(val, 0) || 0;
      },
      setSchematic(state, data) {
        const val =
          data.value || colorTools.genNextIndex(state.schematic[data.id]);
        state.schematic[data.id] = val;
        state.schematic_color[data.id] =
          colorTools.getColorMap()[val] || flatWhite;
        let summedVal = 0;
        state.schematic.forEach((thisVal) => {
          if (thisVal > -1) summedVal += 1;
        });
        if (summedVal >= 2) state.value = parseInt(summedVal, 0) || 0;
      },
    },
  });
}
function generateNewCardStore() {
  return new Vuex.Store({
    state: {
      cards: [generateNewCard()],
    },
    mutations: {
      addCard(state) {
        state.cards.push(generateNewCard());
      },
      updateCards(state, inputCards) {
        state.cards = inputCards;
      },
    },
  });
}

const cardStore = generateNewCardStore();

cardStore.commit('addCard');

export { cardStore, generateNewCardStore };
