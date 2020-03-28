<template>
  <div class="industries">
    <div>
      <button class="button" v-on:click="add">Add a new Card!</button>
    </div>
    <draggable v-model="cards" @start="drag = true" @end="drag = false">
      <transition-group type="transition">
        <div v-for="card in cards" :key="card.state.id" class="inline">
          <ProductTile :identifier="card.state.id" :cardmodel="card" />
        </div>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import store from '@/utils/dataManager';
import ProductTile from '@/components/GamePieces/Product-Tile';
import industryStore from '@/utils/industryManager';
import draggable from 'vuedraggable';

export default {
  name: 'Industries',
  mounted() {},
  components: {
    ProductTile,
    draggable,
  },
  computed: {
    count() {
      return store.state.count;
    },
    industry() {
      return store.state.industry;
    },
    cards: {
      get() {
        const selected = industryStore.state.selected;
        if (!selected) return [];
        return selected.state.cardStore.state.cards;
      },
      set(cards) {
        const selected = industryStore.state.selected;
        if (!selected) return;
        selected.state.cardStore.commit('updateCards', cards);
      },
    },
  },
  methods: {
    add: () => {
      const selected = industryStore.state.selected;
      if (!selected) return;
      selected.state.cardStore.commit('addCard');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.industries {
  font-weight: 700;
}
.inline {
  display: inline-block;
}
</style>
