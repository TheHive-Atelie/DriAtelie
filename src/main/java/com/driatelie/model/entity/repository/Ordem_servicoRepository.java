package com.driatelie.model.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.driatelie.model.entity.Ordem_servico;

import java.time.LocalDate;
import java.util.List;


public interface Ordem_servicoRepository extends JpaRepository<Ordem_servico, Integer> {

    List<Ordem_servico> findByData(LocalDate data);

}