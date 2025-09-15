package com.driatelie.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
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
    @GeneratedValue 
    private int id_servicos;
    @Column(name = "nome_tipo_servico", length = 25, nullable = false)
    private String nome_tipo_servico;
    @Column(name = "preco", length = 4, nullable = false)
    private int preco;
    @Column(name = "tempo_estimado", length = 3)
    private int tempo_estimado;

}

// create table servicos(
// id_servicos INT AUTO_INCREMENT PRIMARY KEY,
// nome_tipo_servico VARCHAR(25) NOT NULL, 
// preco INT(4) NOT NULL,
// tempo_estimado INT(3));