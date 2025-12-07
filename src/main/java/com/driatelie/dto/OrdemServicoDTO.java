package com.driatelie.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrdemServicoDTO {
    private Integer id;
    private Integer clienteId;
    // Accept a nested cliente object in incoming JSON as { "cliente": { "id": 1 } }
    // This field is optional and used only to support older payload shapes from Postman/UI.
    private ClienteRef cliente;
    private String clienteNome;
    private String clienteTelefone;
    private Integer servicoId;
    private String servicoNome;
    private ServicoRef servico;
    private LocalDate data;
    private Integer tempoEstimadoDias;
    private Double valorTotal;
    private Double sinal;
    private String tipoPagamento;
    private String observacoes;

    // helper to unify access: prefer explicit clienteId, otherwise use nested cliente.id
    public Integer getEffectiveClienteId() {
        if (this.clienteId != null) return this.clienteId;
        if (this.cliente != null) return this.cliente.getId();
        return null;
    }

    // helper to unify access for servico id
    public Integer getEffectiveServicoId() {
        if (this.servicoId != null) return this.servicoId;
        if (this.servico != null) return this.servico.getId();
        return null;
    }

    // small nested class to deserialize { "cliente": { "id": 1 } }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ClienteRef {
        private Integer id;
    }

    // small nested class to deserialize { "servico": { "id": 2 } }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ServicoRef {
        private Integer id;
    }
}
