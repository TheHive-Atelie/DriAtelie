package com.driatelie.model.entity.repository;

import java.util.List;

import com.driatelie.model.entity.Saida;

public interface SaidaRepository {

    public Saida findById(Integer id);

    public List<Saida> findAll();

    public List<Saida> findByNome_saida(String nome_saida);

    public List<Saida> findByData(String data);

    public void deleteById(Integer id);

    public Saida save(Saida saida);
}
