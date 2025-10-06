package com.driatelie.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driatelie.model.entity.Saida;
import com.driatelie.model.entity.repository.SaidaRepository;

@Service
public class SaidaService {

    @Autowired
    SaidaRepository saidaRepository;

    public void delSaida(Integer id) {
        saidaRepository.deleteById(id);
    }

    public Saida salvarSaida(Saida saida) {
        return saidaRepository.save(saida);
    }

    public List<Saida> getAll() {
        return saidaRepository.findAll();
    }

    public Saida getId(Integer id) {
        return saidaRepository.findById(id);
    }
    public List<Saida> getNomeSaida(String nome_saida) {
        return saidaRepository.findByNome_saida(nome_saida);
    }
    public List<Saida> getData(String data) {
        return saidaRepository.findByData(data);
    }

}