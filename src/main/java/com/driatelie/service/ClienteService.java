package com.driatelie.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.driatelie.model.entity.Cliente;
import com.driatelie.model.entity.Ordem_servico;
import com.driatelie.model.entity.repository.ClienteRepository;

import jakarta.transaction.Transactional;

@Service    
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> getClienteById(Integer id) {
        return clienteRepository.findById(id);
    }

    public List<Cliente> getByName(String nome) {
        return clienteRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Cliente saveCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @Transactional
    public void deleteCliente(Integer id) {
        clienteRepository.deleteById(id);
    }

    public List<Ordem_servico> getOrdensServicoByClienteId(Integer id) {
    Cliente cliente = clienteRepository.findById(id).orElse(null);
        if (cliente != null) {
            return cliente.getOrdensServico();
        }
        return Collections.emptyList(); 
    }
}
