package com.driatelie.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driatelie.model.entity.Ordem_servico;
import com.driatelie.service.Ordem_servicoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



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
    
}
