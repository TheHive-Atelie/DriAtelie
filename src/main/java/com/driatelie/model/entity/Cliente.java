package com.driatelie.model.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "clientes")
@NoArgsConstructor
@AllArgsConstructor

public class Cliente {
    
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer idclientes;
@Column(name = "nome_cliente", nullable = false)
private String nome_cliente;
@Column(name = "telefone_cliente")
private String telefone_cliente;
@Column(name = "email_cliente")
private String email_cliente;

@OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
private List<Ordem_servico> ordensServico;

}
// CREATE TABLE `clientes` (
// `idclientes` int NOT NULL AUTO_INCREMENT,
// `nome_cliente` varchar(45) NOT NULL,
// `telefone_cliente` varchar(45) DEFAULT NULL,
// `email_cliente` varchar(45) DEFAULT NULL,
// `ordens_servico` int DEFAULT NULL,
// PRIMARY KEY (`idclientes`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
