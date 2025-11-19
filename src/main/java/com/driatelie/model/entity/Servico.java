package com.driatelie.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "servicos")
@NoArgsConstructor
@AllArgsConstructor
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idServicos;
    @Column(name = "nome_tipo_servico", nullable = false)
    private String nomeTipoServico;
    @Column(name = "preco", nullable = false)
    private int preco;
    @Column(name = "tempo_estimado")
    private int tempoEstimado;

}
// create table servicos(
// id_servicos INT AUTO_INCREMENT PRIMARY KEY,
// nome_tipo_servico VARCHAR(25) NOT NULL, 
// preco INT(4) NOT NULL,
// tempo_estimado INT(3));