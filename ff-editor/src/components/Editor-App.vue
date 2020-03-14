

<template>
  <div class="industries">
    <Industries />
  </div>
</template>
<script>
import Industries from '@/components/Industry-List';
export default {
  name: 'EditorApp',
  components: {
    Industries
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .industries {
    font-weight: 700;
  }
</style>
