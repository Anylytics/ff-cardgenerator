

<template>
  <div class="row">
    <div class="col-3">
      <ConfigForm/>
    </div>
    <div class="col-9">
      <Industries/>
    </div>
  </div>
</template>
<script>
import Industries from '@/components/Industry-List';
import ConfigForm from '@/components/Data-Reader';

export default {
  name: 'EditorApp',
  components: {
    Industries,
    ConfigForm,
  },
  data() {
    return {
      product: 'test',
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
