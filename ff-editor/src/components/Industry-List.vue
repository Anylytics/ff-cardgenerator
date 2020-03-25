<template>
  <div class="industries">{{ industry }}</div>
</template>
<script>
import store from '@/manager/dataManager';

export default {
  name: 'Industries',
  computed: {
    count() {
      return store.state.count;
    },
    industry() {
      return store.state.industry;
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
