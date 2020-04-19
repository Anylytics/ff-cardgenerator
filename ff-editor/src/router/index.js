import Vue from 'vue';
import Router from 'vue-router';
import Editor from '@/components/Editor-App';
import Sandbox from '@/pages/Sandbox';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Editor',
      component: Editor,
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox,
    },
  ],
});
