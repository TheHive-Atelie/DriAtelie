package com.driatelie.model.entity.repository;

import java.util.List;
import java.util.Optional;

import com.driatelie.model.entity.Ordem_servico;

public interface Ordem_servicoRepository {

    public Ordem_servico findById(Integer id);

    public List<Ordem_servico> findByData(String data);

    public List<Ordem_servico> findByTipoPagamento(String tipoPagamento);

    public Optional<Ordem_servico> findByCliente(String cliente);

    public Optional<Ordem_servico> findByServico(String servico);
    
    public Ordem_servico save(Ordem_servico ordemServico);
    public void deleteById(Integer id);

    public java.util.List<Ordem_servico> findAll();
}