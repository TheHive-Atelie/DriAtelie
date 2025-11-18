package com.driatelie.service;

import com.driatelie.model.entity.Servico;
import com.driatelie.model.entity.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    // Retorna todos os serviços
    public List<Servico> getAll() {
        return servicoRepository.findAll();
    }

    // Busca serviço por ID
    public Servico findById(Integer id) {
        Optional<Servico> servico = servicoRepository.findById(id);
        return servico.orElse(null);
    }

    // Busca serviço por nome (ou parte do nome)
    public List<Servico> getNomeServico(String nome) {
        return servicoRepository.findByNomeTipoServicoContainingIgnoreCase(nome);
    }

    // Salva (cria ou atualiza) um serviço
    public Servico saveServico(Servico servico) {
        return servicoRepository.save(servico);
    }

    // Deleta um serviço pelo ID
    public void delServico(Integer id) {
        servicoRepository.deleteById(id);
    }
}
