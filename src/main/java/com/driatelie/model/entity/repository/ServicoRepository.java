package com.driatelie.model.entity.repository;

import java.util.List;

import com.driatelie.model.entity.Servico;

public interface ServicoRepository {

    public Servico findById(Integer id);

    public List<Servico> findAll();

    public List<Servico> findByNome_servico(String nome_servico);

    public Servico save(Servico servico);

    public void deleteById(Integer id);

}
