<template>
  <div class="industries">
    <div>
      <button class="button" v-on:click="greet">Add a new Card!</button>
    </div>
    <ProductTile
      v-for="card in cards"
      :key="card.state.id"
      :identifier="card.state.id"
      :cardmodel="card"
    />
  </div>
</template>
<script>
import store from '@/utils/dataManager';
import cardStore from '@/utils/cardManager';
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
    cards() {
      return cardStore.state.cards;
    },
  },
  methods: {
    greet: () => {
      cardStore.commit('addCard');
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
