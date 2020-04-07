import Vuex from 'vuex';
import Vue from 'vue';
import Storage from './storage';
import colorTools from './colorTools';

const flatWhite = colorTools.flatWhite;
const productStore = {};

function processProduct(thisProduct) {
  if (!thisProduct.industry) return;
  if (!productStore[thisProduct.industry]) {
    productStore[thisProduct.industry] = {};
  }
  const industryProductStore = productStore[thisProduct.industry];
  industryProductStore[thisProduct.id] = {};
  Object.keys(thisProduct).forEach((objKey) => {
    industryProductStore[thisProduct.id][objKey] = thisProduct[objKey];
  });
  Storage.storeData('PRODUCTS', productStore);
}

const saveProductsToLocal = (store) => {
  processProduct(store.state);
  store.subscribe(() => {
    processProduct(store.state);
  });
};

Vue.use(Vuex);

function generateNewCard(inputState) {
  const productId =
    inputState.id || `_${Math.random().toString(36).substr(2, 9)}`;
  return new Vuex.Store({
    state: {
      product: inputState.product || 'Product Name',
      industry: inputState.industry || null,
      id: productId,
      futures: inputState.futures || ['BIG MAMA', 'BIG PAPA'],
      industry_color: inputState.industry_color || '',
      value: inputState.value || 2,
      schematic: inputState.schematic || new Array(9).fill(-1),
      schematic_color:
        inputState.schematic_color || new Array(9).fill(flatWhite),
    },
    mutations: {
      setProductName(state, val) {
        if (!val) return;
        state.product = val;
      },
      setIndustry(state, val) {
        if (!val) return;
        state.industry = val;
        state.industry_color = colorTools.colorMap[val] || flatWhite;
      },
      setValue(state, val) {
        if (!val) return;
        state.value = parseInt(val, 0) || 0;
      },
      setFuture(state, val) {
        state.futures[0] = val;
      },
      setFuture2(state, val) {
        state.futures[1] = val;
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
    plugins: [saveProductsToLocal],
  });
}
function generateNewCardStore(inputIndustry) {
  return new Vuex.Store({
    state: {
      industry: inputIndustry || null,
      cards: [],
    },
    mutations: {
      addCardFromStore(state, inputState) {
        state.cards.push(generateNewCard(inputState));
      },
      addCard(state, industryKey) {
        state.cards.push(generateNewCard({ industry: industryKey }));
      },
      updateCards(state, inputCards) {
        state.cards = inputCards;
      },
    },
  });
}

const cardStore = generateNewCardStore();

export { cardStore, generateNewCardStore };
