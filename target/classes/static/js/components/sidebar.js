import { router } from '../components/router-view.js';

export const AppSidebar = {
  template: `
    <aside class="container-sidebar">
      <div class="sidebar-top">
        <div class="sidebar-title">Navegação</div>

        <nav class="sidebar-nav">
          <a href="#" @click.prevent="navigateTo('/')" :class="['nav-item', { active: isActive('/') }]">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="" class="nav-icon">
            <span>Home</span>
          </a>
          <a href="#" @click.prevent="navigateTo('/comandas')" :class="['nav-item', { active: isActive('/comandas') }]">
            <img src= "../../images/doc.png" alt="" class="nav-icon">
            <span>Comandas</span>
          </a>
          <a href="#" @click.prevent="navigateTo('/clientes')" :class="['nav-item', { active: isActive('/clientes') }]">
            <img src="https://cdn-icons-png.flaticon.com/512/456/456212.png" alt="" class="nav-icon">
            <span>Clientes</span>
          </a>
          <a href="#" @click.prevent="navigateTo('/servicos')" :class="['nav-item', { active: isActive('/servicos') }]">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="" class="nav-icon">
            <span>Serviços</span>
          </a>
          <a href="#" @click.prevent="navigateTo('/financas')" :class="['nav-item', { active: isActive('/financas') }]">
            <img src="../../images/dolar.png" alt="" class="nav-icon">
            <span>Finanças</span>
          </a>
        </nav>
      </div>

      <div class="sidebar-bottom">
        <div class="sidebar-footer-text">DRI'AH Studio</div>
      </div>
    </aside>
  `,
  data() {
    return {
      currentPath: '/'
    }
  },
  methods: {
    navigateTo(path) {
      router.push(path);
      this.currentPath = path;
    },
    isActive(path) {
      return this.currentPath === path;
    }
  },
  created() {
    router.subscribe((route) => {
      this.currentPath = route.path;
    });
  }
};