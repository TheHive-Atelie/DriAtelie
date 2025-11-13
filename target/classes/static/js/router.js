import { Home } from './components/Home.js';
import { ListaClientes } from './components/lista_clientes.js';
import { Servicos } from './components/Servicos.js';
import { Comandas } from './components/Comandas.js';
import { Financas } from './components/Financas.js';

export const routes = [
  { path: '/', component: Home, name: 'home', label: 'Home' },
  { path: '/clientes', component: ListaClientes, name: 'clientes', label: 'Clientes' },
  { path: '/servicos', component: Servicos, name: 'servicos', label: 'Serviços' },
  { path: '/comandas', component: Comandas, name: 'comandas', label: 'Comandas' },
  { path: '/financas', component: Financas, name: 'financas', label: 'Finanças' }
];
