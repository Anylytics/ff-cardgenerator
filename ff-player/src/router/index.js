import Vue from 'vue';
import Router from 'vue-router';
import Backlog from '@/components/Backlog';
import KanbanBoard from '@/components/KanbanBoard';
import RicochetBoard from '@/components/RicochetBoard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/backlog',
      component: Backlog,
    },
    {
      path: '/board',
      component: RicochetBoard,
    },
    {
      path: '*',
      redirect: '/board',
    },
  ],
});
