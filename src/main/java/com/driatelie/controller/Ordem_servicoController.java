package com.driatelie.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driatelie.model.entity.Ordem_servico;
import com.driatelie.service.Ordem_servicoService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("/os")
public class Ordem_servicoController {

    @Autowired
    private Ordem_servicoService ordem_servicoService;

    @GetMapping
    public ResponseEntity<List<Ordem_servico>> listAll() {
        List<Ordem_servico> ordem_servicos = ordem_servicoService.listAll();
        return ResponseEntity.ok(ordem_servicos);
    }   

    @GetMapping("/{id}")
    public ResponseEntity<?> findByIs(@PathVariable Integer id) {
        List<Ordem_servico> ordem_servicos = ordem_servicoService.getOrdem_servicosById(id);
        if (!ordem_servicos.isEmpty()) {
            return ResponseEntity.ok(ordem_servicos);
        } else {
            return ResponseEntity.status(404).body("Ordem de serviço não encontrada");
        }
    }

    @GetMapping("/data/{data}")
    public ResponseEntity<?> findByData(@PathVariable String data) {
        try {
            java.time.LocalDate dataParsed = java.time.LocalDate.parse(data);
            List<Ordem_servico> ordem_servicos = ordem_servicoService.getOrdem_servicosByData(dataParsed);
            if (!ordem_servicos.isEmpty()) {
                return ResponseEntity.ok(ordem_servicos);
            } else {
                return ResponseEntity.status(404).body("Nenhuma ordem de serviço encontrada para a data especificada");
            }
        } catch (java.time.format.DateTimeParseException ex) {
            return ResponseEntity.badRequest().body("Formato de data inválido. Use yyyy-MM-dd");
        }
    }
    
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<?> findByClienteId(@PathVariable Integer clienteId) {
        try {
            List<Ordem_servico> all = ordem_servicoService.listAll();
            List<Ordem_servico> filtered = all.stream()
                .filter(os -> os.getCliente() != null && clienteId.equals(os.getCliente().getId()))
                .collect(Collectors.toList());
            return ResponseEntity.ok(filtered);
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Erro ao buscar ordens de serviço por cliente");
        }
    }
    
    @PostMapping
    public ResponseEntity<Ordem_servico> newOrdem_servico(@RequestBody Ordem_servico ordem_servico) {
        try {
            Ordem_servico novaOrdem_servico = ordem_servicoService.saveOrdem_servico(ordem_servico);
            return ResponseEntity.status(201).body(novaOrdem_servico);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        } catch (Exception ex) {
            // Could log the exception
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrdem_servicoById(@PathVariable Integer id, @RequestBody Ordem_servico ordem_servicoAtualizado) {
        List<Ordem_servico> ordem_servicosExistentes = ordem_servicoService.getOrdem_servicosById(id);
        if (!ordem_servicosExistentes.isEmpty()) {
            ordem_servicoAtualizado.setId(id);
            try {
                Ordem_servico atualizado = ordem_servicoService.saveOrdem_servico(ordem_servicoAtualizado);
                return ResponseEntity.ok(atualizado);
            } catch (IllegalArgumentException ex) {
                return ResponseEntity.badRequest().body(ex.getMessage());
            } catch (Exception ex) {
                // Could log the exception
                return ResponseEntity.status(500).build();
            }
        } else {
            return ResponseEntity.status(404).body("Ordem de serviço não encontrada");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> dellOrdem_servicoById(@PathVariable Integer id) {
        List<Ordem_servico> ordem_servicos = ordem_servicoService.getOrdem_servicosById(id);
        if (!ordem_servicos.isEmpty()) {
            ordem_servicoService.deleteOrdem_servico(id);
            return ResponseEntity.ok("Ordem de serviço deletada com sucesso");
        } else {
            return ResponseEntity.status(404).body("Ordem de serviço não encontrada");
        }
    }   
}