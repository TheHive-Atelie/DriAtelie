import { AppSidebar } from './components/sidebar.js';
import { ListaClientes } from './components/lista_clientes.js';

const app = Vue.createApp({
  components: {
    'app-sidebar': AppSidebar,
    'lista-clientes': ListaClientes
  },
  
  data() {
    return {
      telaAtual: 'home'
    }
  },
    
  methods: {
    mudarTela(tela) {
      this.telaAtual = tela;
    }
  },

  template: `
    <div class="app-shell">
      <app-sidebar></app-sidebar>
      <lista-clientes></lista-clientes>
    </div>
  `
});

app.mount('#app');