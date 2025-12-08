package com.driatelie.model.entity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.driatelie.model.entity.Cliente;
import com.driatelie.model.entity.Ordem_servico;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {    
    
    java.util.List<Cliente> findByNomeContainingIgnoreCase(String nome);

    List<Ordem_servico> findOrdem_servicosById(Integer id);
}