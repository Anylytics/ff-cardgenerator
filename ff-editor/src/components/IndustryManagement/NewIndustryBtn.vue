<template>
  <button class="button is-full-width" v-on:click="add">Add Industry</button>
</template>
<script>
import industryStore from '@/utils/industryManager';

export default {
  name: 'NewIndustryBtn',
  methods: {
    add() {
      industryStore.commit('add');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.industries {
  font-weight: 700;
}
</style>
