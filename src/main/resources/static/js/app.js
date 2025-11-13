import { AppSidebar } from './components/sidebar.js';
import { RouterView } from './components/router-view.js';

const app = Vue.createApp({
  components: {
    'app-sidebar': AppSidebar,
    'router-view': RouterView
  },

  template: `
    <div class="app-shell">
      <app-sidebar></app-sidebar>
      <router-view></router-view>
    </div>
  `
});

app.mount('#app');