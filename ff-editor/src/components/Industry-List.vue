<template>
  <div class="industries">
    <div>
      <h3 class="animated fadeInDown" v-if="!hasSelectedIndustry">
        Select an Industry to get Started!
      </h3>
      <button
        class="button is-full-width secondary"
        v-on:click="add"
        v-if="hasSelectedIndustry"
      >
        Add a new <b>{{ hasSelectedIndustry.state.name }}</b> Product!
      </button>
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
    hasSelectedIndustry: {
      get() {
        return industryStore.state.selected;
      },
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
      selected.commit('addCard');
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
