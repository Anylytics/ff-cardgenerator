import Industries from '@/components/Industry-List';

<template>
  <div class="industries">
    <Industries/>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      industries: [
        {
          name: "healthcare"
        },
        {
          name: "military"
        },
        {
          name: "travel"
        },
        {
          name: "entertainment"
        },
      ],
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
