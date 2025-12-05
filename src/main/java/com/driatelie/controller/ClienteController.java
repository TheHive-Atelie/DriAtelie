package com.driatelie.controller;

import com.driatelie.model.entity.Cliente;
import com.driatelie.service.ClienteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<Cliente>> listAll() {
        List<Cliente> clientes = clienteService.listAll();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        Optional<Cliente> cliente = clienteService.getClienteById(id);
        if (cliente.isPresent()) {
            return ResponseEntity.ok(cliente.get());
        } else {
            return ResponseEntity.status(404).body("Cliente não encontrado");
        }
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<Cliente>> findByName(@PathVariable String nome) {
        List<Cliente> clientes = clienteService.getByName(nome);
        return ResponseEntity.ok(clientes);
    }

    @PostMapping
    public ResponseEntity<?> newCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = clienteService.saveCliente(cliente);
        return ResponseEntity.status(201).body(novoCliente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClienteById(@PathVariable Integer id, @RequestBody Cliente clienteAtualizado) {
        Optional<Cliente> clienteExistente = clienteService.getClienteById(id);
        if (clienteExistente.isPresent()) {
            clienteAtualizado.setId(id);
            Cliente atualizado = clienteService.saveCliente(clienteAtualizado);
            return ResponseEntity.ok(atualizado);
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
}
