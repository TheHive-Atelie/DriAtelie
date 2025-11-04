import { clientesData } from '../js/data/clientesData.js';
import { AppHeader } from '../js/components/header.js';

const app = Vue.createApp({
  components: {
    'app-header': AppHeader
  },
  
  // data() {
  //   return {
  //     telaAtual: 'home',
  //     clientes: clientesData
  //   }
  // },
    
  //   methods: {
  //   mudarTela(tela) {
  //     this.telaAtual = tela;
  //   }
// },

  template: `
    <div class="container">
        <app-header></app-header>
    </div>
  `
});

app.mount('#app');