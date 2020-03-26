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
  d3.xml(ProductTile).then((data) => {
    this.card.node().append(data.documentElement);
    const cardTitle = this.card.select('#featureLabel').select('textPath');
    const cardValue = this.card.select('#val').select('tspan');

    cardmodel.subscribe((mutation, state) => {
      if (mutation.type === 'setIndustry') {
        cardTitle.text(state.industry);
      }
      if (mutation.type === 'setValue') {
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

    cardTitle.on('click', () => {
      cardTitle.text('Wheeeee');
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
