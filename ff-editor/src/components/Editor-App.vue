<template>
  <div class="row">
    <div class="col-3 control-panel">
      <NewIndustryBtn />
      <div
        v-for="industry in industries"
        v-on:click="select(industry)"
        :key="industry.state.id"
      >
        <IndustryEditor :industrymodel="industry" />
      </div>
    </div>
    <div class="col-9">
      <Industries />
    </div>
  </div>
</template>
<script>
import Industries from '@/components/Industry-List';
import NewIndustryBtn from '@/components/IndustryManagement/NewIndustryBtn';
import ConfigForm from '@/components/Data-Reader';
import industryStore from '@/utils/industryManager';
import IndustryEditor from '@/components/IndustryManagement/IndustryEditor';

export default {
  name: 'EditorApp',
  components: {
    Industries,
    ConfigForm,
    NewIndustryBtn,
    IndustryEditor,
  },
  computed: {
    industries() {
      return industryStore.state.industries;
    },
    selectedIndustry() {
      const selected = industryStore.state.selected;
      if (!selected) return 'No Industry Selected';
      return selected.state.name;
    },
  },
  methods: {
    select(industry) {
      industryStore.commit('select', industry);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.industries {
  font-weight: 700;
}
</style>
