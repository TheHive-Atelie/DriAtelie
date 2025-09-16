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
@Table(name = "saidas")
@NoArgsConstructor
@AllArgsConstructor

public class Saida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer  idsaida;
    @Column(name = "nome_saida", nullable = false)
    private String nome_saida;
    @Column(name = "data")
    private String data;
    @Column(name = "valor", nullable = false)
    private int valor;
    @Column(name = "obs")
    private String obs;
}

/*
 * CREATE TABLE `saidas` (
 * `idsaida` int NOT NULL,
 * `nome_saida` varchar(45) NOT NULL,
 * `data` varchar(45) DEFAULT NULL,
 * `valor` int NOT NULL,
 * `obs` varchar(350) DEFAULT NULL,
 * PRIMARY KEY (`idsaida`)
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
 * COMMENT='tablea que representa o controle financeiro do atelie';
 */