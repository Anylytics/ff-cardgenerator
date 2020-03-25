

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
import store from '@/manager/dataManager';

export default {
  name: 'DataReader',
  methods: {
    increment() {
      store.commit('increment');
    },
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
