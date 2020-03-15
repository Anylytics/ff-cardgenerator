<template>
  <div class="industries"><ProductTile /></div>
</template>
<script>
import store from '@/utils/dataManager';
import ProductTile from '@/components/GamePieces/Product-Tile';

export default {
  name: 'Industries',
  mounted() {},
  components: {
    ProductTile,
  },
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
