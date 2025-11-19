package com.driatelie.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "ordens_de_servico")
@NoArgsConstructor
@AllArgsConstructor


public class Ordem_servico {    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idordens_de_servico")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente", nullable = false, 
                foreignKey = @ForeignKey(name = "id_cliente"))
    @JsonBackReference
    private Cliente cliente;
    
    @Column(name = "data", length = 45)
    private String data;
    
    @Column(name = "telefone_cliente", length = 45)
    private String telefoneCliente;
    
    @Column(name = "valor_total", nullable = false)
    private Integer valorTotal;
    
    @Column(name = "sinal", nullable = false)
    private Integer sinal;
    
    @Column(name = "tipo_pagamento", length = 45)
    private String tipoPagamento;
    
    @Column(name = "obs", length = 350)
    private String obs;

}