<template>
  <div id="app">
    <div class="page-header">
      <h1>Ricochet Robot</h1>
    </div>
    <menu-bar></menu-bar>
    <controls></controls>
    <router-view/>
    
  </div>
</template>
<script>
import MenuBar from '@/components/MenuBar';
import Controls from '@/components/Controls';

export default {
  name: 'app',
  components: {
    'menu-bar': MenuBar,
    'controls': Controls,
  },
};
</script>

<style scoped>
  .page-header h1 {
    font-weight: 300;
  }

  .card {
    margin-bottom: 10px;
  }

  .card:last-child {
    margin-bottom: 25px;
  }

  .card-block {
    padding: 15px;
  }
</style>
