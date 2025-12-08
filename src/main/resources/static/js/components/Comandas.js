export const Comandas = {
  name: 'Comandas',
  data() {
    return {
      searchQuery: '',
      orders: [],
      services: [],
      clients: [],
      loading: false,
      servicesLoading: false,
      clientsLoading: false,
      error: null,
      showModal: false,
      showViewModal: false,
      editingOrder: null,
      viewingOrder: null,
      formData: {
        id_cliente: '',
        id_servico: '',
        data: '',
        valor_total: '',
        sinal: '',
        tipo_pagamento: '',
        obs: ''
      },
      paymentOptions: ['pix', 'cartão de crédito', 'cartão de débito', 'dinheiro'],
      validationErrors: {}
    }
  },
  computed: {
    filteredOrders() {
      if (!this.searchQuery) return this.orders;
      const query = String(this.searchQuery).toLowerCase().trim();

      // encontrar serviços que correspondam ao termo (por nome, id ou preco)
      const matchedServiceIds = this.services
        .filter(s => {
          if (!s) return false;
          const name = (s.name || '').toString().toLowerCase();
          const preco = s.preco !== undefined && s.preco !== null ? String(s.preco).toLowerCase() : '';
          const id = s.id !== undefined && s.id !== null ? String(s.id).toLowerCase() : '';
          return name.includes(query) || preco.includes(query) || id.includes(query);
        })
        .map(s => String(s.id));

      // encontrar clientes que correspondam ao termo (por nome, id ou telefone)
      const matchedClientIds = this.clients
        .filter(c => {
          if (!c) return false;
          const name = (c.nome || c.name || '').toString().toLowerCase();
          const phone = (c.telefone || c.phone || c.clienteTelefone || c.contato || '').toString().toLowerCase();
          const id = c.id !== undefined && c.id !== null ? String(c.id).toLowerCase() : '';
          return name.includes(query) || phone.includes(query) || id.includes(query);
        })
        .map(c => String(c.id));

      return this.orders.filter(order => {
        const q = query;
        if (String(order.id).toLowerCase().includes(q)) return true;
        if (order.clienteId && String(order.clienteId).toLowerCase().includes(q)) return true;
        if (order.servicoId && String(order.servicoId).toLowerCase().includes(q)) return true;
        if (order.clienteNome && order.clienteNome.toLowerCase().includes(q)) return true;
        if (order.servicoNome && order.servicoNome.toLowerCase().includes(q)) return true;
        if (order.clienteTelefone && String(order.clienteTelefone).toLowerCase().includes(q)) return true;
        if (order.observacoes && order.observacoes.toLowerCase().includes(q)) return true;

        // incluir ordens cujo serviço corresponde ao termo pesquisado
        if (matchedServiceIds.includes(String(order.servicoId))) return true;

        // incluir ordens cujo cliente corresponde ao termo pesquisado
        if (matchedClientIds.includes(String(order.clienteId))) return true;

        return false;
      });
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

    async fetchServices() {
      this.servicesLoading = true
      try {
        const res = await fetch('/servicos')
        if (!res.ok) throw new Error('Falha ao buscar serviços: ' + res.status)
        const data = await res.json()
        this.services = Array.isArray(data) ? data.map(s => ({
          id: s.id_servicos || s.id || s.idServicos,
          name: s.nomeTipoServico || s.name || s.nome,
          preco: s.preco || 0
        })) : []
      } catch (err) {
        console.error(err)
        this.services = []
      } finally {
        this.servicesLoading = false
      }
    },

    async fetchClients() {
      this.clientsLoading = true
      try {
        const res = await fetch('/clientes')
        if (!res.ok) throw new Error('Falha ao buscar clientes: ' + res.status)
        const data = await res.json()
        this.clients = Array.isArray(data) ? data : (data.content || data.data || [])
      } catch (err) {
        console.error(err)
        this.clients = []
      } finally {
        this.clientsLoading = false
      }
    },

    formatDate(isoDateStr) {
      if (!isoDateStr) return ''
      try {
        const parts = String(isoDateStr).split('-')
        if (parts.length === 3) {
          const year = parseInt(parts[0])
          const month = parseInt(parts[1])
          const day = parseInt(parts[2])
          return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
        }
        return isoDateStr
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

    openAddModal() {
      this.editingOrder = null
      this.validationErrors = {}
      this.formData = {
        id_cliente: '',
        id_servico: '',
        data: '',
        valor_total: '',
        sinal: '',
        tipo_pagamento: '',
        obs: ''
      }
      this.showModal = true
    },

    openEditModal(order) {
      this.editingOrder = order
      this.validationErrors = {}
      this.formData = {
        id_cliente: order.clienteId,
        id_servico: order.servicoId,
        data: order.data,
        valor_total: order.valorTotal,
        sinal: order.sinal,
        tipo_pagamento: order.tipoPagamento,
        obs: order.observacoes
      }
      this.showModal = true
    },

    openViewModal(order) {
      this.viewingOrder = order
      this.showViewModal = true
    },

    closeModal() {
      this.showModal = false
      this.editingOrder = null
      this.validationErrors = {}
      this.formData = {
        id_cliente: '',
        id_servico: '',
        data: '',
        valor_total: '',
        sinal: '',
        tipo_pagamento: '',
        obs: ''
      }
    },

    closeViewModal() {
      this.showViewModal = false
      this.viewingOrder = null
    },

    validateForm() {
      this.validationErrors = {}
      if (!this.formData.id_cliente) {
        this.validationErrors.id_cliente = 'Cliente é obrigatório'
      }
      if (!this.formData.id_servico) {
        this.validationErrors.id_servico = 'Serviço é obrigatório'
      }
      if (!this.formData.data) {
        this.validationErrors.data = 'Data é obrigatória'
      }
      if (!this.formData.valor_total) {
        this.validationErrors.valor_total = 'Valor total é obrigatório'
      }
      if (!this.formData.sinal) {
        this.validationErrors.sinal = 'Sinal é obrigatório'
      }
      if (!this.formData.tipo_pagamento) {
        this.validationErrors.tipo_pagamento = 'Tipo de pagamento é obrigatório'
      }
      return Object.keys(this.validationErrors).length === 0
    },

    async saveOrder() {
      if (!this.validateForm()) return

      const payload = {
        clienteId: this.formData.id_cliente ? Number(this.formData.id_cliente) : null,
        servicoId: this.formData.id_servico ? Number(this.formData.id_servico) : null,
        data: this.formData.data || null,
        valorTotal: this.formData.valor_total ? Number(this.formData.valor_total) : null,
        sinal: this.formData.sinal ? Number(this.formData.sinal) : null,
        tipoPagamento: this.formData.tipo_pagamento || null,
        observacoes: this.formData.obs || null
      }

      try {
        if (this.editingOrder && this.editingOrder.id) {
          // Build entity-shaped payload expected by the PUT endpoint
          const payloadEntity = {
            cliente: { id: payload.clienteId },
            servico: { id_servicos: payload.servicoId },
            data: payload.data,
            valorTotal: payload.valorTotal,
            sinal: payload.sinal,
            tipoPagamento: payload.tipoPagamento,
            observacoes: payload.observacoes
          }

          const res = await fetch(`/os/${this.editingOrder.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadEntity)
          })
          if (!res.ok) {
            const txt = await res.text()
            throw new Error('Erro ao atualizar: ' + (txt || res.status))
          }
        } else {
          const res = await fetch('/os', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          if (!res.ok) {
            const txt = await res.text()
            throw new Error('Erro ao criar: ' + (txt || res.status))
          }
        }
        await this.fetchOrders()
        this.closeModal()
      } catch (err) {
        console.error(err)
        this.validationErrors.submit = err.message
      }
    },

    async deleteOrder(id) {
      if (!confirm('Tem certeza que deseja deletar esta Ordem de Serviço?')) return
      try {
        const res = await fetch(`/os/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Erro ao deletar')
        this.orders = this.orders.filter(order => order.id !== id)
      } catch (err) {
        console.error(err)
        alert('Erro ao deletar: ' + err.message)
      }
    },

    onView(order) {
      this.openViewModal(order)
    }
  },
  watch: {
    'formData.id_servico'(newServiceId) {
      if (newServiceId) {
        const selectedService = this.services.find(s => s.id == newServiceId)
        if (selectedService && selectedService.preco) {
          this.formData.valor_total = selectedService.preco
        }
      }
    }
  },
  mounted() {
    this.fetchOrders()
    this.fetchServices()
    this.fetchClients()
  },

  template: `
    <div class="main-area page-content">
      <div class="comandas-crud">
        <header class="page-header header">
          <div class="header page-header">
            <h1>Listagem de Ordens de Serviço</h1>
            <div class="subtitle">Ordens de serviço cadastradas no sistema</div>
          </div>
          <div class="header-right">
            <div class="brand">DRI'AH</div>
            <div class="avatar"></div>
          </div>
        </header>

        <section class="page-content">
          <div class="actions-bar">
            <div class="search-container">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Pesquisar por ID, cliente, serviço ou telefone..." 
                class="search-input"
              />
              <button class="search-btn">Q</button>
            </div>
            <button class="add-btn" @click="openAddModal">Adicionar Comanda</button>
          </div>

          <div class="comandas-table">
            <div v-if="loading" class="loading-message">Carregando ordens de serviço...</div>
            <div v-else-if="error" class="error-message">Erro: {{ error }}</div>
            <div v-else-if="orders.length === 0" class="empty-message">Nenhuma ordem de serviço encontrada.</div>

            <div v-else class="services-table">
              <div class="list-header">
                <div class="id-column header-cell">ID O.S.</div>
                <div class="id-column header-cell">ID Cliente</div>
                <div class="name-column header-cell">Cliente</div>
                <div class="id-column header-cell">ID Serviço</div>
                <div class="name-column header-cell">Serviço</div>
                <div class="date-column header-cell">Data</div>
                <div class="time-column header-cell">Tempo Est.</div>
                <div class="value-column header-cell">Valor Total</div>
                <div class="value-column header-cell">Sinal</div>
                <div class="status-column header-cell">Pagamento</div>
                <div class="actions-column header-cell">Ações</div>
              </div>

              <div 
                v-for="order in filteredOrders" 
                :key="order.id" 
                class="order-item table-row">
                <div class="id-column cell cell--os">#{{ String(order.id).padStart(3, '0') }}</div>
                <div class="id-column cell cell--cliente-id">#{{ order.clienteId ? String(order.clienteId).padStart(3, '0') : '-' }}</div>
                <div class="name-column cell cell--cliente">{{ order.clienteNome || '-' }}</div>
                <div class="id-column cell cell--servico-id">#{{ order.servicoId ? String(order.servicoId).padStart(3, '0') : '-' }}</div>
                <div class="name-column cell cell--servico">{{ order.servicoNome || '-' }}</div>
                <div class="date-column cell cell--data">{{ formatDate(order.data) }}</div>
                <div class="time-column cell cell--tempo">{{ order.tempoEstimadoDias ? order.tempoEstimadoDias + ' d' : '-' }}</div>
                <div class="value-column cell cell--valor">{{ formatCurrency(order.valorTotal) }}</div>
                <div class="value-column cell cell--sinal">{{ formatCurrency(order.sinal) }}</div>
                <div class="status-column cell cell--pagamento">{{ order.tipoPagamento || '-' }}</div>
                <div class="actions-column actions cell cell--acoes">
                  <button class="view-btn action-btn" @click="onView(order)" title="Ver" aria-label="Ver">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <!-- edit button removed from row; editing available via View modal -->
                  <button class="delete-btn action-btn" @click="deleteOrder(order.id)" title="Remover" aria-label="Remover">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal de Visualização -->
          <div v-if="showViewModal" class="modal-overlay" @click="closeViewModal">
            <div class="modal-content view-modal" @click.stop>
              <h2>Detalhes da Comanda #{{ viewingOrder ? String(viewingOrder.id).padStart(3, '0') : '' }}</h2>
              <div v-if="viewingOrder" class="view-details">
                <div class="detail-row">
                  <span class="detail-label">ID da Ordem:</span>
                  <span class="detail-value">#{{ String(viewingOrder.id).padStart(3, '0') }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Cliente:</span>
                  <span class="detail-value">{{ viewingOrder.clienteNome || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Telefone do Cliente:</span>
                  <span class="detail-value">{{ viewingOrder.clienteTelefone || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Serviço:</span>
                  <span class="detail-value">{{ viewingOrder.servicoNome || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Data da Ordem:</span>
                  <span class="detail-value">{{ formatDate(viewingOrder.data) }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Tempo Estimado:</span>
                  <span class="detail-value">{{ viewingOrder.tempoEstimadoDias ? viewingOrder.tempoEstimadoDias + ' dias' : '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Valor Total:</span>
                  <span class="detail-value">{{ formatCurrency(viewingOrder.valorTotal) }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Sinal Pago:</span>
                  <span class="detail-value">{{ formatCurrency(viewingOrder.sinal) }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Saldo Restante:</span>
                  <span class="detail-value">{{ formatCurrency((viewingOrder.valorTotal || 0) - (viewingOrder.sinal || 0)) }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Tipo de Pagamento:</span>
                  <span class="detail-value">{{ viewingOrder.tipoPagamento || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Observações:</span>
                  <span class="detail-value">{{ viewingOrder.observacoes || '-' }}</span>
                </div>
              </div>
              <div class="modal-actions">
                <button type="button" class="cancel-btn" @click="closeViewModal">Fechar</button>
                <button type="button" class="edit-btn" @click="openEditModal(viewingOrder); closeViewModal()">Editar</button>
              </div>
            </div>
          </div>

          <!-- Modal de Edição/Criação -->
          <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
              <h2>{{ editingOrder ? 'Editar Ordem de Serviço' : 'Adicionar Ordem de Serviço' }}</h2>

              <div v-if="validationErrors.submit" class="error-message">{{ validationErrors.submit }}</div>

              <form @submit.prevent="saveOrder">
                <div class="form-group">
                  <label for="id_cliente">Cliente:</label>
                  <select id="id_cliente" v-model="formData.id_cliente" required>
                    <option value="">-- selecione um cliente --</option>
                    <option v-for="c in clients" :key="c.id" :value="c.id">{{ c.id }} - {{ c.nome || c.name }}</option>
                  </select>
                  <div v-if="validationErrors.id_cliente" class="field-error">{{ validationErrors.id_cliente }}</div>
                </div>

                <div class="form-group">
                  <label for="id_servico">Serviço:</label>
                  <select id="id_servico" v-model="formData.id_servico" required>
                    <option value="">-- selecione um serviço --</option>
                    <option v-for="s in services" :key="s.id" :value="s.id">{{ s.id }} - {{ s.name }}</option>
                  </select>
                  <div v-if="validationErrors.id_servico" class="field-error">{{ validationErrors.id_servico }}</div>
                </div>

                <div class="form-group">
                  <label for="data">Data do serviço:</label>
                  <input id="data" type="date" v-model="formData.data" required />
                  <div v-if="validationErrors.data" class="field-error">{{ validationErrors.data }}</div>
                </div>

                <div class="form-group">
                  <label for="valor_total">Valor Final (em reais):</label>
                  <input id="valor_total" type="number" v-model="formData.valor_total" required placeholder="0.00" />
                  <div v-if="validationErrors.valor_total" class="field-error">{{ validationErrors.valor_total }}</div>
                </div>

                <div class="form-group">
                  <label for="sinal">Sinal do pedido (em reais):</label>
                  <input id="sinal" type="number" v-model="formData.sinal" required placeholder="0.00" />
                  <div v-if="validationErrors.sinal" class="field-error">{{ validationErrors.sinal }}</div>
                </div>

                <div class="form-group">
                  <label for="tipo_pagamento">Tipo do pagamento:</label>
                  <select id="tipo_pagamento" v-model="formData.tipo_pagamento" required>
                    <option value="">-- selecione o tipo de pagamento --</option>
                    <option v-for="opt in paymentOptions" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                  <div v-if="validationErrors.tipo_pagamento" class="field-error">{{ validationErrors.tipo_pagamento }}</div>
                </div>

                <div class="form-group">
                  <label for="obs">Observações:</label>
                  <textarea id="obs" v-model="formData.obs" placeholder="Digite observações adicionais"></textarea>
                </div>

                <div class="modal-actions">
                  <button type="button" class="cancel-btn" @click="closeModal">Cancelar</button>
                  <button type="submit" class="save-btn" :disabled="servicesLoading || clientsLoading">{{ editingOrder ? 'Atualizar' : 'Salvar' }}</button>
                </div>
              </form>
            </div>
          </div>

        </section>
      </div>
    </div>
  `
};


