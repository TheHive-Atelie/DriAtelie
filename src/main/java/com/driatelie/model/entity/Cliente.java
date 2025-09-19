package com.driatelie.model.entity;

import jakarta.persistence.*;

@Entity                 // Marca que esta classe é uma entidade JPA (tabela)
@Table(name = "clientes")  // Diz qual é o nome da tabela no banco
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id auto increment no banco
    private Long id;

    @Column(nullable = false) // obrigatório
    private String nome;

    private String telefone;

    private String email;

    // Construtor vazio (obrigatório pelo JPA)
    public Cliente() {}

    // Getters e setters para cada campo
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
