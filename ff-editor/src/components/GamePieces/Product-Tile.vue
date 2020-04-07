<template>
  <div>
    <svg v-bind:id="identifier" width="81.634796mm" height="53.412571mm" />
    <h3 class="text-center animated tada">{{ product }}</h3>
  </div>
</template>

<script>
import * as d3 from 'd3';
import colorTools from '@/utils/colorTools';
import ProductTile from '@/assets/product-tile.svg';

function onMount() {
  const cardmodel = this.cardmodel;
  this.card = d3.select(`svg#${this.identifier}`);
  // TODO: Make this more efficient, pulling XML on every new card addition
  d3.xml(ProductTile).then((data) => {
    this.card.node().append(data.documentElement);
    const cardTitle = this.card.select('#featureLabel').select('textPath');
    const cardValue = this.card.select('#val').select('tspan');
    const cardFuture = this.card.select('#future').select('tspan');
    const cardFuture2 = this.card.select('#future2').select('tspan');
    // const cardArt = this.card.select('#productArt');

    cardmodel.subscribe((mutation, state) => {
      if (mutation.type === 'setProductName') {
        cardTitle.text(state.product);
      }
      if (mutation.type === 'setValue' || mutation.type === 'setSchematic') {
        cardValue.text(parseInt(state.value, 0));
      }
      if (mutation.type === 'setSchematic') {
        const schematic = this.cardmodel.state.schematic_color;
        schematic.forEach((val, idx) => {
          const slot = this.card.select(`#${colorTools.getIdToName()[idx]}`);
          slot
            .style('fill', val)
            .style('fill-opacity', 0.25)
            .style('stroke', val);
        });
      }
      if (mutation.type === 'setFuture') {
        cardFuture.text(this.cardmodel.state.futures[0] || '');
      }
      if (mutation.type === 'setFuture2') {
        cardFuture2.text(this.cardmodel.state.futures[1] || '');
      }
    });

    cardTitle.text(cardmodel.state.product);
    cardValue.text(cardmodel.state.value);
    cardFuture.text(cardmodel.state.futures[0] || '');
    cardFuture2.text(cardmodel.state.futures[1] || '');

    cardTitle.on('click', () => {
      // eslint-disable-next-line
      cardmodel.commit('setProductName', prompt());
    });
    cardValue.on('click', () => {
      // eslint-disable-next-line
      cardmodel.commit('setValue', prompt());
    });
    cardFuture.on('click', () => {
      // eslint-disable-next-line
      cardmodel.commit('setFuture', prompt());
    });
    cardFuture2.on('click', () => {
      // eslint-disable-next-line
      cardmodel.commit('setFuture2', prompt());
    });

    this.cardmodel.state.schematic_color.forEach((val, idx) => {
      const slot = this.card.select(`#${colorTools.getIdToName()[idx]}`);
      slot
        .style('fill', val)
        .style('fill-opacity', 0.25)
        .style('stroke', val === '#fff' ? 'whitesmoke' : val);
      slot.on('click', () => {
        cardmodel.commit('setSchematic', {
          id: idx,
        });
      });
    });
  });
}

export default {
  name: 'Industries',
  props: ['identifier', 'cardmodel'],
  mounted: onMount,
  computed: {
    product: {
      get() {
        return this.cardmodel.state.product;
      },
    },
  },
};
</script>

<style>
svg * {
  user-select: none;
}
svg {
  margin: 10px;
}
</style>
