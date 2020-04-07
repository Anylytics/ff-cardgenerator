// This file will be used to store the application state
import Vuex from 'vuex';
import Vue from 'vue';
import { generateNewCardStore } from './productManager';
import Storage from './storage';

Vue.use(Vuex);

const storageKey = 'INDUSTRIES';
const existingIndustries = Storage.getData(storageKey);
const existingProducts = Storage.getData('PRODUCTS');

const saveIndustriesToLocal = (store) => {
  store.subscribe((mutation) => {
    if (mutation.type === 'setName' || mutation.type === 'add') {
      // eslint-disable-next-line
      const industries = industryStore.state.industries;
      const storedIndustries = [];
      industries.forEach((industry) => {
        storedIndustries.push({
          name: industry.state.name,
          id: industry.state.id,
        });
      });
      Storage.storeData(storageKey, storedIndustries);
    }
  });
};

function generateIndustry(industryFromStore) {
  const inputIndustry = industryFromStore || {};
  const industryId =
    inputIndustry.id || `_${Math.random().toString(36).substr(2, 9)}`;
  const newCardStore = generateNewCardStore({ industryId });
  return new Vuex.Store({
    state: {
      color: '#fff',
      active: false,
      name: inputIndustry.name || 'Industry Name',
      id: industryId,
      cardStore: newCardStore,
    },
    mutations: {
      setColor(state, color) {
        state.color = color;
      },
      addCard(state) {
        newCardStore.commit('addCard', state.id);
      },
      setName(state, name) {
        state.name = name;
      },
      setActive(state) {
        state.active = true;
      },
      inactivate(state) {
        state.active = false;
      },
    },
    plugins: [saveIndustriesToLocal],
  });
}

const industryStore = new Vuex.Store({
  state: {
    industries: [],
    selected: null,
  },
  mutations: {
    add(state, industryFromStore) {
      state.industries.push(generateIndustry(industryFromStore));
    },
    select(state, industry) {
      state.selected = industry;
      state.industries.forEach((ind) => {
        const thisIndustry = ind;
        thisIndustry.commit('inactivate');
      });
      industry.commit('setActive');
    },
  },
  plugins: [saveIndustriesToLocal],
});

if (existingIndustries) {
  existingIndustries.forEach((thisIndustry) => {
    industryStore.commit('add', thisIndustry);
  });
}
if (existingProducts) {
  industryStore.state.industries.forEach((industry) => {
    const thisIndustry = industry.state.id;
    const industryFromStore = existingProducts[thisIndustry];
    if (!industryFromStore) return;
    Object.keys(industryFromStore).forEach((product) => {
      industry.state.cardStore.commit(
        'addCardFromStore',
        industryFromStore[product],
      );
    });
  });
}

export default industryStore;
