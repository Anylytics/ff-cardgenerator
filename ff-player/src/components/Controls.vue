<template>
  <div class="container">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" v-on:click="changeToken(-1)">
            <a class="page-link" href="#">Previous</a>
          <li class="page-item" v-on:click="changeToken(1)">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
/* eslint-disable no-console */
export default {
  name: "Controls",
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["connection"])
  },
  methods: {
    changeToken(direction) {
        this.$store.commit("changeToken",{direction: direction})
    }
  }
};
</script>
