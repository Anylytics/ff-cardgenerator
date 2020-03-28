<template>
  <svg v-bind:id="identifier" width="81.634796mm" height="53.412571mm" />
</template>

<script>
import * as d3 from 'd3';
import colorTools from '@/utils/colorTools';
import ProductTile from '@/assets/product-tile.svg';

function onMount() {
  const cardmodel = this.cardmodel;
  this.card = d3.select(`svg#${this.identifier}`);
  // TODO: Make this more efficient
  d3.xml(ProductTile).then((data) => {
    this.card.node().append(data.documentElement);
    const cardTitle = this.card.select('#featureLabel').select('textPath');
    const cardValue = this.card.select('#val').select('tspan');
    const cardFuture = this.card.select('#future').select('tspan');
    const cardArt = this.card.select('#productArt');

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
    });

    cardTitle.text(cardmodel.state.product);
    cardValue.text(cardmodel.state.value);
    cardFuture.text('Hello!');

    cardTitle.on('click', () => {
      // eslint-disable-next-line
      cardmodel.commit('setProductName', prompt());
    });
    cardValue.on('click', () => {
      // eslint-disable-next-line
      cardmodel.commit('setValue', prompt());
    });

    cardArt.on('click', console.log);

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
