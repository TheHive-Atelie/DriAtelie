package com.driatelie.model.entity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.driatelie.model.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    java.util.List<Cliente> findByNomeContainingIgnoreCase(String nome);

    java.util.List<Cliente> findByOrdensServicoContainingIgnoreCaseList(String nome);

    java.util.List<Cliente> findByTelefone_clienteContainingIgnoreCaseClientes(String nome);
    List<Cliente> findById(Integer id, String nome);

}