package com.driatelie.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrdemServicoDTO {
    private Integer id;
    private Integer clienteId;
    private String clienteNome;
    private LocalDate data;
    private Double valorTotal;
    private Double sinal;
    private String tipoPagamento;
    private String observacoes;
}
