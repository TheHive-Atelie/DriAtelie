package com.driatelie.model.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.driatelie.model.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {    
    
    java.util.List<Cliente> findByNomeContainingIgnoreCase(String nome);

}