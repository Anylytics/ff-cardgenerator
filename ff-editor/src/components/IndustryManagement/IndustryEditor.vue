<template>
  <form class="card">
    <div>
      <label for="product">Industry Name</label>
      <input id="product" type="text" v-model="name" class="input" />
    </div>
    <div>
      <label for="color">Background</label>
      <input id="color" type="color" class="input" />
    </div>
    <div>Product Count: {{ productCount }}</div>
  </form>
</template>
<script>
export default {
  name: 'IndustryEditor',
  props: ['industrymodel'],
  computed: {
    name: {
      get() {
        return this.industrymodel.state.name;
      },
      set(val) {
        this.industrymodel.commit('setName', val);
      },
    },
    productCount() {
      return this.industrymodel.state.cardStore.length;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
