// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VuePeerJS from 'vue-peerjs';
import Peer from 'peerjs';
import App from './App';
import router from './router';
import store from './store';
import {randomInteger, indexToPos, posToIndex} from './utils.js';

Vue.use(VuePeerJS, new Peer({}), {store});
Vue.config.productionTip = false;
Vue.mixin({
  methods: {
    randomInteger : randomInteger,
    indexToPos: indexToPos,
    posToIndex: posToIndex,
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});