import { AppSidebar } from './components/sidebar.js';
import { RouterView } from './components/router-view.js';

// Inject popup styles
(function injectPopupStyles() {
  const href = '/css/popups.css';
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
})();

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