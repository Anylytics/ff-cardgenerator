<template>
  <div>
    <form>
      <label for="product">Product</label>
      <input id="product" type="text" v-model="product" class="input" />
      <label for="value">Value</label>
      <input id="value" type="text" v-model="value" class="input" />
    </form>
  </div>
</template>
<script>
import store from '@/utils/dataManager';
import { cardStore } from '@/utils/cardManager';

export default {
  name: 'DataReader',
  methods: {
    increment() {
      store.commit('increment');
    },
  },
  mounted: () => {
    store.commit('setCard', cardStore.state.cards[0]);
  },
  computed: {
    product: {
      get() {
        return store.state.industry;
      },
      set(value) {
        store.commit('setIndustry', value);
      },
    },
    value: {
      get() {
        return store.state.value;
      },
      set(value) {
        store.commit('setValue', value);
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
