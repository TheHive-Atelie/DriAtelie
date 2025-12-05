package com.driatelie.model.entity.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.driatelie.model.entity.Ordem_servico;

@Repository
public interface Ordem_servicoRepository extends JpaRepository<Ordem_servico, Integer> {

    List<Ordem_servico> findByData(LocalDate data);
    
    List<Ordem_servico> findByClienteId(Integer clienteId);

}