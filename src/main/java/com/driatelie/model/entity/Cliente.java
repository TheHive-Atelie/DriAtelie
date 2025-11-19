package com.driatelie.model.entity;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    @Column(name = "id_cliente")
    private Integer id;
    
    @Column(name = "nome_cliente", nullable = false, length = 45)
    private String nomeCliente;
    
    @Column(name = "telefone_cliente", length = 45)
    private String telefoneCliente;
    
    @Column(name = "email_cliente", length = 45)
    private String emailCliente;
    
    @OneToMany(mappedBy = "cliente")
    @JsonManagedReference
    private List<Ordem_servico> ordensServico;

}
