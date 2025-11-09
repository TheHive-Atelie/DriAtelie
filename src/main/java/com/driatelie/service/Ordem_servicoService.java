package com.driatelie.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.driatelie.model.entity.Cliente;
import com.driatelie.model.entity.Ordem_servico;
import com.driatelie.model.entity.repository.ClienteRepository;
import com.driatelie.model.entity.repository.Ordem_servicoRepository;

@Service
public class Ordem_servicoService {
    
    private final Ordem_servicoRepository ordem_servicoRepository;
    private final ClienteRepository clienteRepository;

    public Ordem_servicoService(Ordem_servicoRepository ordem_servicoRepository,
            ClienteRepository clienteRepository) {
        this.ordem_servicoRepository = ordem_servicoRepository;
        this.clienteRepository = clienteRepository;
    }

    public List<Ordem_servico> listAll() {
        return ordem_servicoRepository.findAll();
    }

    public List<Ordem_servico> getOrdem_servicosById(Integer id) {
        return ordem_servicoRepository.findAllById(List.of(id));
    }

    public List<Ordem_servico> getOrdem_servicosByData(LocalDate data) {
        return ordem_servicoRepository.findByData(data);
    }

    public Ordem_servico saveOrdem_servico(Ordem_servico ordem_servico) {
        if (ordem_servico == null) {
            throw new IllegalArgumentException("Ordem_servico não pode ser nula");
        }

        Cliente cliente = ordem_servico.getCliente();
        if (cliente == null || cliente.getId() == null) {
            throw new IllegalArgumentException("Cliente inválido ou id do cliente ausente");
        }

        Optional<Cliente> clientePersistido = clienteRepository.findById(cliente.getId());
        if (clientePersistido.isEmpty()) {
            throw new IllegalArgumentException("Cliente com id " + cliente.getId() + " não encontrado");
        }

        // Substitui o cliente transitório pelo gerenciado
        ordem_servico.setCliente(clientePersistido.get());

        return ordem_servicoRepository.save(ordem_servico);
    }

    public void deleteOrdem_servico(Integer id) {
        ordem_servicoRepository.deleteById(id);
    }

}