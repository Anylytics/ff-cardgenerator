<template>
  <div class="container">
    <div class="hand">
      <div class="card resource-card card-1">
        <div class="resource-content blue"></div>
      </div>
      <div class="card resource-card card-2">
        <div class="resource-content red"></div>
      </div>
      <div class="card resource-card card-3">
        <div class="resource-content orange"></div>
      </div>
      <div class="card resource-card card-4">
        <div class="resource-content green"></div>
      </div>
      <div class="card resource-card card-5">
        <div class="resource-content green"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sandbox',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hand {
  position: relative;
  margin-top: 96px;
}
.hand > * {
  display: inline-block;
  position: absolute;
  transition: 0.4s ease-out;
  opacity: 0.7;
}
.card-1 {
  transform: rotate(-16deg) translateX(-16px);
}
.card-2 {
  transform: rotate(-8deg) translateX(-8px);
  left: 24px;
}
.card-3 {
  left: 48px;
}
.card-4 {
  transform: rotate(8deg) translateX(8px);
  left: 72px;
}
.card-5 {
  transform: rotate(16deg) translateX(16px);
  left: 96px;
}
.resource-card {
  height: 256px;
  width: 192px;
  cursor: pointer;
  text-align: center;
  margin: 0;
  padding: 0;
}
.resource-content.green {
  background: #2ecc71;
}
.resource-content.blue {
  background: #3498db;
}
.resource-content.red {
  background: #e74c3c;
}
.resource-content.orange {
  background: #f39c12;
}
.resource-card .resource-content {
  height: calc(100% - 24px);
  width: calc(100% - 24px);
  margin: 12px;
  border-radius: 4px;
}
.resource-card:hover {
  transform: rotate(0) translateY(-64px);
  opacity: 1;
}
</style>
