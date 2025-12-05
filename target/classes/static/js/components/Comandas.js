export const Comandas = {
  name: 'Comandas',
  data() {
    return {
      searchQuery: '',
      orders: [],
      loading: false,
      error: null
    }
  },
  methods: {
    async fetchOrders() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('/os')
        if (!res.ok) throw new Error('Falha ao buscar ordens: ' + res.status)
        const data = await res.json()
        this.orders = Array.isArray(data) ? data : []
      } catch (err) {
        console.error(err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    formatDate(isoDateStr) {
      if (!isoDateStr) return ''
      try {
        const d = new Date(isoDateStr)
        if (isNaN(d)) return isoDateStr
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
      } catch (e) {
        return isoDateStr
      }
    },

    formatCurrency(val) {
      if (val === null || val === undefined) return ''
      try {
        return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      } catch (e) {
        return val
      }
    },

    onCreate() {
      alert('Criar nova comanda: não implementado ainda')
    },

    onView(order) {
      alert('Ver comanda: não implementado ainda (id ' + order.id + ')')
    },

    onDelete(order) {
      alert('Remover comanda: não implementado ainda (id ' + order.id + ')')
    }
  },

  mounted() {
    this.fetchOrders()
  },

  template: `
    <div class="main-area page-content">
    <div class="comandas-crud">
      <header class="page-header header">

    <div class="header page-header">
      <h1>Listagem de serviços</h1>
      <div class="subtitle">Lista de serviços disponíveis</div>
    </div>

        <div class="header-right">
          <div class="brand">DRI'AH</div>
          <div class="avatar"></div>
        </div>

      </header>

      <section class="page-content">
        <!-- Barra de pesquisa e ações -->
    <div class="actions-bar">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Pesquisar serviços..." 
          class="search-input"
        />
        <button class="search-btn">Q</button>
      </div>
      <button class="add-btn" @click="openAddModal">
        Adicionar comanda
      </button>
    </div>

        <div class="comandas-table">
          <div v-if="loading">Carregando ordens de serviço...</div>
        <div v-if="error" class="error">Erro: {{ error }}</div><div class="servicos-table">

              <!-- theader -->
         <div class="services-table">
            <div class="list-header">
              <div class="deadline-column header-cell">Id da O.S.</div>
              <div class="deadline-column header-cell">Id do Cliente</div>
              <div class="deadline-column header-cell">Id do Serviço Executado</div>
              <div class="deadline-column header-cell">Data da criação</div>
              <div class="deadline-column header-cell">Data da criação</div>
              <div class="deadline-column header-cell">Telefone do Cliente</div>
              <div class="deadline-column header-cell">Valor final da OS</div>
              <div class="deadline-column header-cell">Sinal</div>
              <div class="deadline-column header-cell">Tipo Pagamento</div>
              <div class="deadline-column header-cell">Detalhes</div>

              <div class="actions-column header-cell">Ações</div>
            </div>
          </div>

        <div 
        v-for="order in filteredorders" 
        :key="order.id" 
        class="order-item table-row">

          <div>#{{ String(order.id).padStart(3, '0') }}</div>
          <div class="name-column cell comandas-cliente">#{{ order.clienteId ? String(order.clienteId).padStart(3, '0') : '-' }}</div>

          <div class="price-column cell">R$ {{ order.price }}</div>
          <div class="deadline-column cell">{{ order.deadline }} dias</div>
          <div class="actions-column actions cell">
            <button class="edit-btn action-btn" @click="openEditModal(order)">
             Editar
            </button>
            <button class="delete-btn action-btn" @click="deleteorder(order.id)">
              Deletar
           </button>
         </div>

        </div>

             <tbody>
               <tr v-for="order in orders" :key="order.id">
                  <td></td>
                  <td></td>
                 <td>{{ formatDate(order.data) }}</td>
                 <td>{{ formatCurrency(order.valorTotal) }}</td>
                 <td>
                   <button class="view-btn" @click.prevent="onView(order)">Ver</button>
                    <button class="remove-btn" @click.prevent="onDelete(order)">Remover</button>
                  </td>
                </tr>
                <tr v-if="orders.length === 0">
                  <td colspan="5" class="empty">Nenhuma ordem de serviço encontrada.</td>
               </tr>
             </tbody>

            </table>
          </div>
        </div>

      </section>
      </div>
    </div>
  `
};
