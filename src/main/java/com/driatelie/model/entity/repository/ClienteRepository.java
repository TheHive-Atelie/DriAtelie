 package com.driatelie.model.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.driatelie.model.entity.Cliente;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, String> {    
    
    java.util.List<Cliente> findByNomeContainingIgnoreCase(String nome);

    Optional<Cliente> findById(Integer id);

    void deleteById(Integer id);

    


}