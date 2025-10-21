package com.driatelie.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.driatelie.model.entity.Ordem_servico;
import com.driatelie.model.entity.repository.Ordem_servicoRepository;

@Service
public class Ordem_servicoService {
    
    private final Ordem_servicoRepository ordem_servicoRepository;

    public Ordem_servicoService(Ordem_servicoRepository ordem_servicoRepository) {
        this.ordem_servicoRepository = ordem_servicoRepository;
    }

    public List<Ordem_servico> listAll() {
        return ordem_servicoRepository.findAll();
    }

    public List<Ordem_servico> getOrdem_servicosById(Integer id) {
        return ordem_servicoRepository.findAllById(List.of(id));
    }

    public List<Ordem_servico> getOrdem_servicosByData(LocalDate data) {
        return ordem_servicoRepository.findAll().stream()
                .filter(os -> os.getData().equals(data))
                .toList();
    }

    public Ordem_servico saveOrdem_servico(Ordem_servico ordem_servico) {
        return ordem_servicoRepository.save(ordem_servico);
    }

    public void deleteOrdem_servico(Integer id) {
        ordem_servicoRepository.deleteById(id);
    }

}
