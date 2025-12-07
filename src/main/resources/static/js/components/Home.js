export const Home = {
  data() {
    return {
      loading: false,
      error: null,
      ordens: [],
      detailOpen: false,
      selectedOS: null,
      statusDraft: null
    };
  },
  computed: {
    finalizados() {
      return this.ordens.filter((o) => o.status === 'Finalizados');
    },
    producao() {
      return this.ordens.filter((o) => o.status === 'Producao');
    },
    pendentes() {
      return this.ordens.filter((o) => o.status === 'Pendente');
    }
  },
  mounted() {
    this.fetchOrdens();
  },
  methods: {
    statusLabel(status) {
      if (status === 'Finalizados') return 'Finalizados';
      if (status === 'Producao') return 'Produção';
      return 'Pendente';
    },
    normalizeStatus(raw) {
      if (raw === 'Encerrados' || raw === 'Encerrado') return 'Pendente';
      if (raw === 'Finalizados' || raw === 'Finalizado') return 'Finalizados';
      if (raw === 'Producao' || raw === 'Produção') return 'Producao';
      return raw || 'Pendente';
    },
    async fetchOrdens() {
      this.loading = true;
      this.error = null;
      try {
        const resp = await fetch('/os');
        if (!resp.ok) throw new Error(`Erro ao carregar OS: ${resp.status}`);
        const data = await resp.json();
        const stored = JSON.parse(localStorage.getItem('osStatus') || '{}');
        this.ordens = (Array.isArray(data) ? data : []).map((os) => ({
          ...os,
          status: this.normalizeStatus(stored[os.id]) || 'Pendente'
        }));
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    saveStatus(osId, status) {
      const stored = JSON.parse(localStorage.getItem('osStatus') || '{}');
      stored[osId] = status;
      localStorage.setItem('osStatus', JSON.stringify(stored));
    },
    openDetail(os) {
      this.selectedOS = os;
      this.statusDraft = os.status;
      this.detailOpen = true;
    },
    closeDetail() {
      this.detailOpen = false;
      this.selectedOS = null;
      this.statusDraft = null;
    },
    applyStatus() {
      if (!this.selectedOS) return;
      const normalized = this.normalizeStatus(this.statusDraft);
      this.selectedOS.status = normalized;
      this.saveStatus(this.selectedOS.id, normalized);
      this.ordens = [...this.ordens];
      this.detailOpen = true;
    },
    changeStatus(os, status) {
      const normalized = this.normalizeStatus(status);
      os.status = normalized;
      this.saveStatus(os.id, normalized);
      this.ordens = [...this.ordens];
      if (this.selectedOS && this.selectedOS.id === os.id) {
        this.statusDraft = normalized;
        this.selectedOS.status = normalized;
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString + 'T00:00:00');
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    formatCurrency(value) {
      const num = Number(value || 0);
      return num.toFixed(2).replace('.', ',');
    },
    serviceName(os) {
      return os?.servico?.nomeTipoServico || os?.nomeTipoServico || os?.servico?.nome || 'Serviço';
    },
    clientName(os) {
      const name = os?.cliente?.nome || os?.nomeCliente || null;
      return name && name.trim() ? name : 'Cliente';
    },
    clientPhone(os) {
      const phone = os?.cliente?.telefone_cliente || os?.telefone_cliente || null;
      return phone && String(phone).trim() ? phone : 'Não informado';
    }
  },
  template: `
    <div class="main-area home-area">
      <header class="page-header">
        <div class="header-left">
          <h1 class="header-title">Home</h1>
        </div>
        <div class="header-right">
          <div class="brand">DRI'AH</div>
          <div class="avatar"></div>
        </div>
      </header>

      <section class="page-content home-page">
        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-else class="carousels-container">
          <div class="carousel-row">
            <div class="carousel-header">
              <h2>Produção</h2>
              <span class="count">{{ producao.length }} itens</span>
            </div>
            <div class="cards-track" :class="{'is-loading': loading}">
              <div v-for="os in producao" :key="os.id" class="home-card">
                <div class="card-top">
                  <span class="card-id">OS #{{ os.id }}</span>
                  <span class="status-pill producao">{{ statusLabel(os.status) }}</span>
                </div>
                <div class="card-body">
                  <div class="card-title">{{ serviceName(os) }}</div>
                  <div class="card-sub">Cliente: {{ clientName(os) }}</div>
                  <div class="card-meta">
                    <span>{{ formatDate(os.data) || 'Sem data' }}</span>
                    <span>R$ {{ formatCurrency(os.valorTotal) }}</span>
                  </div>
                </div>
                <div class="card-actions">
                  <select class="status-mini" :value="os.status" @change="changeStatus(os, $event.target.value)">
                    <option value="Producao">Produção</option>
                    <option value="Finalizados">Finalizados</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                  <button class="btn add-btn" @click="openDetail(os)">Ver</button>
                </div>
              </div>
              <div v-if="!loading && producao.length === 0" class="empty-card">Nenhum em produção</div>
            </div>
          </div>

          <div class="carousel-row">
            <div class="carousel-header">
              <h2>Finalizados</h2>
              <span class="count">{{ finalizados.length }} itens</span>
            </div>
            <div class="cards-track" :class="{'is-loading': loading}">
              <div v-for="os in finalizados" :key="os.id" class="home-card">
                <div class="card-top">
                  <span class="card-id">OS #{{ os.id }}</span>
                  <span class="status-pill finalizado">{{ statusLabel(os.status) }}</span>
                </div>
                <div class="card-body">
                  <div class="card-title">{{ serviceName(os) }}</div>
                  <div class="card-sub">Cliente: {{ clientName(os) }}</div>
                  <div class="card-meta">
                    <span>{{ formatDate(os.data) || 'Sem data' }}</span>
                    <span>R$ {{ formatCurrency(os.valorTotal) }}</span>
                  </div>
                </div>
                <div class="card-actions">
                  <select class="status-mini" :value="os.status" @change="changeStatus(os, $event.target.value)">
                    <option value="Producao">Produção</option>
                    <option value="Finalizados">Finalizados</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                  <button class="btn add-btn" @click="openDetail(os)">Ver</button>
                </div>
              </div>
              <div v-if="!loading && finalizados.length === 0" class="empty-card">Nenhum finalizado</div>
            </div>
          </div>

          <div class="carousel-row">
            <div class="carousel-header">
              <h2>Pendentes</h2>
              <span class="count">{{ pendentes.length }} itens</span>
            </div>
            <div class="cards-track" :class="{'is-loading': loading}">
              <div v-for="os in pendentes" :key="os.id" class="home-card">
                <div class="card-top">
                  <span class="card-id">OS #{{ os.id }}</span>
                  <span class="status-pill pendente">{{ statusLabel(os.status) }}</span>
                </div>
                <div class="card-body">
                  <div class="card-title">{{ serviceName(os) }}</div>
                  <div class="card-sub">Cliente: {{ clientName(os) }}</div>
                  <div class="card-meta">
                    <span>{{ formatDate(os.data) || 'Sem data' }}</span>
                    <span>R$ {{ formatCurrency(os.valorTotal) }}</span>
                  </div>
                </div>
                <div class="card-actions">
                  <select class="status-mini" :value="os.status" @change="changeStatus(os, $event.target.value)">
                    <option value="Producao">Produção</option>
                    <option value="Finalizados">Finalizados</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                  <button class="btn add-btn" @click="openDetail(os)">Ver</button>
                </div>
              </div>
              <div v-if="!loading && pendentes.length === 0" class="empty-card">Nenhum pendente</div>
            </div>
          </div>
        </div>
      </section>

      <div v-if="detailOpen" class="modal-backdrop" @click.self="closeDetail">
        <div class="modal os-detail-modal">
          <h2 class="modal-title">Detalhes da Ordem de Serviço</h2>
          <div v-if="selectedOS" class="os-detail-content">
            <div class="detail-row"><strong>Ordem de Serviço(Id):</strong> <span class="detail-row-value">{{ selectedOS.id }}</span></div>
            <div class="detail-row"><strong>Cliente:</strong> <span class="detail-row-value">{{ clientName(selectedOS) }}</span></div>
            <div class="detail-row" v-if="selectedOS.servico && selectedOS.servico.nomeTipoServico"><strong>Serviço:</strong> <span class="detail-row-value">{{ selectedOS.servico.nomeTipoServico }}</span></div>
            <div class="detail-row" v-else-if="selectedOS.nomeTipoServico"><strong>Serviço:</strong> <span class="detail-row-value">{{ selectedOS.nomeTipoServico }}</span></div>
            <div class="detail-row" v-if="selectedOS.servico?.id_servicos != null"><strong>Serviço(id):</strong> <span class="detail-row-value">{{ selectedOS.servico.id_servicos }}</span></div>
            <div class="detail-row" v-if="selectedOS.data"><strong>Data:</strong> <span class="detail-row-value">{{ formatDate(selectedOS.data) }}</span></div>
            <div class="detail-row"><strong>Contato:</strong> <span class="detail-row-value">{{ clientPhone(selectedOS) }}</span></div>
            <div class="detail-row" v-if="selectedOS.valorTotal != null"><strong>Valor total:</strong> <span class="detail-row-value">R$ {{ formatCurrency(selectedOS.valorTotal) }}</span></div>
            <div class="detail-row" v-if="selectedOS.sinal != null"><strong>Sinal:</strong> <span class="detail-row-value">R$ {{ formatCurrency(selectedOS.sinal) }}</span></div>
            <div class="detail-row" v-if="selectedOS.tipoPagamento"><strong>Tipo pagamento:</strong> <span class="detail-row-value">{{ selectedOS.tipoPagamento }}</span></div>
            <div class="detail-row" v-if="selectedOS.observacoes"><strong>Observações:</strong> <span class="detail-row-value">{{ selectedOS.observacoes }}</span></div>
            <div class="detail-row">
              <strong>Status:</strong>
              <select v-model="statusDraft" @change="applyStatus" class="status-select">
                <option value="Producao">Produção</option>
                <option value="Finalizados">Finalizados</option>
                <option value="Pendente">Pendente</option>
              </select>
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn cancel-btn" @click="closeDetail">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `
};
