package com.driatelie.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driatelie.model.entity.Servico;
import com.driatelie.model.entity.repository.ServicoRepository;

@Service
public class ServicoService {
    @Autowired
    ServicoRepository servicoRepository;

    public List<Servico> getAll() {
        return servicoRepository.findAll();
    }
    public Servico findById(Integer id) {
        return servicoRepository.findById(id);
    }
    public List<Servico> getNomeServico(String nome_servico) {
        return servicoRepository.findByNome_servico(nome_servico);
    }

    public Servico saveServico(Servico servico) {
        return servicoRepository.save(servico);
    }
    public void delServico(Integer id) {
        servicoRepository.deleteById(id);
    }
}
