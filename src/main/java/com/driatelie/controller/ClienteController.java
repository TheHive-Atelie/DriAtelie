package com.driatelie.controller;

import com.driatelie.model.entity.Cliente;
import com.driatelie.model.entity.Ordem_servico;
import com.driatelie.service.ClienteService;
import com.driatelie.dto.ClienteDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<ClienteDTO>> listAll() {
        List<Cliente> clientes = clienteService.listAll();
        List<ClienteDTO> dto = clientes.stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        Optional<Cliente> cliente = clienteService.getClienteById(id);
        if (cliente.isPresent()) {
            return ResponseEntity.ok(toDto(cliente.get()));
        } else {
            return ResponseEntity.status(404).body("Cliente não encontrado");
        }
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<ClienteDTO>> findByName(@PathVariable String nome) {
        List<Cliente> clientes = clienteService.getByName(nome);
        List<ClienteDTO> dto = clientes.stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<?> newCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = clienteService.saveCliente(cliente);
        return ResponseEntity.status(201).body(toDto(novoCliente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClienteById(@PathVariable Integer id, @RequestBody Cliente clienteAtualizado) {
        Optional<Cliente> clienteExistente = clienteService.getClienteById(id);
        if (clienteExistente.isPresent()) {
            clienteAtualizado.setId(id);
            Cliente atualizado = clienteService.saveCliente(clienteAtualizado);
            return ResponseEntity.ok(toDto(atualizado));
        } else {
            return ResponseEntity.status(404).body("Cliente não encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> dellClienteById(@PathVariable Integer id) {
        Optional<Cliente> cliente = clienteService.getClienteById(id);
        if (cliente.isPresent()) {
            clienteService.deleteCliente(id);
            return ResponseEntity.ok("Cliente deletado com sucesso");
        } else {
            return ResponseEntity.status(404).body("Cliente não encontrado");
        }
    }

    @GetMapping("/{id}/servicos")
    public ResponseEntity<List<Ordem_servico>> getOrdensDeServico(@PathVariable Integer id) {
        List<Ordem_servico> ordens = clienteService.getOrdensServicoByClienteId(id);
        return ResponseEntity.ok(ordens);
    }

    private ClienteDTO toDto(Cliente c) {
        return new ClienteDTO(
            c.getId(),
            c.getNome(),
            c.getTelefone_cliente(),
            c.getEmail_cliente()
        );
    }
}
