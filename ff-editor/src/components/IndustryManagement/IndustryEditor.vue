<template>
  <form
    class="card"
    v-bind:class="{ 'animated pulse selected': industrymodel.state.active }"
  >
    <div>
      <label for="product">Industry Name</label>
      <input id="product" type="text" v-model="name" class="input" />
    </div>
    <!--div>
      <label for="color">Background</label>
      <input id="color" type="color" class="input" />
    </div-->
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
      return this.industrymodel.state.cardStore.state.cards.length;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css');
form {
  margin-top: 10px;
  margin-bottom: 10px;
}
.selected {
  border: 1px solid #2ecc71;
}
</style>
