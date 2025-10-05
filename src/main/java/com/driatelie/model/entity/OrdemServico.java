package com.driatelie.model.entity;

import java.time.LocalDate;

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


public class OrdemServico {    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idordens_de_servico")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente", nullable = false, 
                foreignKey = @ForeignKey(name = "fk_ordem_servico_cliente"))
    private Cliente cliente;
    
    @Column(name = "data")
    private LocalDate data;
    
    @Column(name = "valor_total", nullable = false)
    private Double valorTotal;
    
    @Column(name = "sinal", nullable = false)
    private Double sinal;
    
    @Column(name = "tipo_pagamento", length = 45)
    private String tipoPagamento;
    
    @Column(name = "obs", length = 350)
    private String observacoes;
    
    // // Método conveniente para obter o telefone do cliente
    // public String getTelefoneCliente() {
    //     return cliente != null ? cliente.getTelefone() : null;
    // }

}

/*
CREATE TABLE `driah`.`ordens_de_servico` (
  `idordens_de_servico` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `data` VARCHAR(45) NULL,
  `telefone_cliente` VARCHAR(45) NULL,
  `valor_total` INT(3) NOT NULL,
  `sinal` INT(3) NOT NULL,
  `tipo_pagamento` VARCHAR(45) NULL,
  `obs` VARCHAR(350) NULL,
  PRIMARY KEY (`idordens_de_servico`),
  INDEX `id_cliente_idx` (`id_cliente` ASC) VISIBLE,
  CONSTRAINT `id_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `driah`.`clientes` (`idclientes`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
COMMENT = 'tabela que descreve as ordens de servico prestadas';
 */