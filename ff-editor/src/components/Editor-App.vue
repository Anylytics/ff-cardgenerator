<template>
  <div>
    <nav class="nav">
      <div class="nav-left">
        <a class="brand" href="#">
          <img src="../../../assets/logo.svg" />
          <h6 class="appTitle"><b>Feature Factory</b> Editor</h6>
        </a>

        <div class="tabs">
          <a v-on:click="download">Save</a>
          <a v-on:click="upload">Load</a>
        </div>
      </div>
      <div class="nav-right">
        <a class="button error" v-on:click="clearAll">Clear</a>
      </div>
    </nav>
    <div class="row padded">
      <div class="col-5 col-3-md control-panel">
        <NewIndustryBtn />
        <div
          v-for="industry in industries"
          v-on:click="select(industry)"
          :key="industry.state.id"
        >
          <IndustryEditor :industrymodel="industry" />
        </div>
      </div>
      <div class="col-7 col-9-md">
        <Industries />
      </div>
    </div>
  </div>
</template>
<script>
import Industries from '@/components/Industry-List';
import NewIndustryBtn from '@/components/IndustryManagement/NewIndustryBtn';
import industryStore from '@/utils/industryManager';
import IndustryEditor from '@/components/IndustryManagement/IndustryEditor';
import Storage from '@/utils/storage';

export default {
  name: 'EditorApp',
  components: {
    Industries,
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
    clearAll() {
      // eslint-disable-next-line
      const shouldClear = confirm('This will clear all work -- continue?');
      if (!shouldClear) return;
      Storage.clearData();
      document.location.reload();
    },
    download() {
      Storage.downloadWork();
    },
    upload() {
      Storage.uploadWork().then((fileContents) => {
        // eslint-disable-next-line
        const shouldReplace = confirm(
          'This will replace all work -- continue?',
        );
        if (!shouldReplace) return;
        Object.keys(fileContents).forEach((storageKey) => {
          const thisStore = JSON.parse(fileContents[storageKey]);
          Storage.loadData(storageKey, thisStore);
        });
        document.location.reload();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.industries {
  font-weight: 700;
}
nav * {
  font-size: 16px;
}
.padded {
  margin: 10px;
}
.appTitle {
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
}
a {
  cursor: pointer;
}
</style>
