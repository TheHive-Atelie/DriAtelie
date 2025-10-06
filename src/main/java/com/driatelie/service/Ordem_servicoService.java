package com.driatelie.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driatelie.model.entity.Ordem_servico;
import com.driatelie.model.entity.repository.Ordem_servicoRepository;

@Service
public class Ordem_servicoService {
    @Autowired
    Ordem_servicoRepository ordemServicoRepository;

    public List<Ordem_servico> listarTodos() {
        return ordemServicoRepository.findAll();
    }

    public List<Ordem_servico> getData(String data) {
        return ordemServicoRepository.findByData(data);
    }
    public List<Ordem_servico> getTipoPagamento(String tipoPagamento) {
        return ordemServicoRepository.findByTipoPagamento(tipoPagamento);
    }

    public List<Ordem_servico> getCliente(String cliente){
        return ordemServicoRepository.findByCliente(cliente).stream().toList();
    }

    public List<Ordem_servico> getServico(String servico){
        return ordemServicoRepository.findByServico(servico).stream().toList();
    }

    public Ordem_servico getId(Integer id) {
        return ordemServicoRepository.findById(id);
    }

    public Ordem_servico salvarOS(Ordem_servico ordemServico) {
        return ordemServicoRepository.save(ordemServico);
    }

    public void deletarOS(Integer id) {
        ordemServicoRepository.deleteById(id);
    }

}
