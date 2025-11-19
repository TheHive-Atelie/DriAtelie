package com.driatelie.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driatelie.model.entity.Servico;
import com.driatelie.service.ServicoService;

@RestController
@RequestMapping("/servicos")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    //Listando todos os serviços
    @GetMapping
    public ResponseEntity<List<Servico>> listAll() {
        List<Servico> servicos = servicoService.getAll();
        return ResponseEntity.ok(servicos);
    }

    //Busca por ID (talvez não seja utilizado)
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        Servico servico = servicoService.findById(id);
        if (servico != null) {
            return ResponseEntity.ok(servico);
        } else {
            return ResponseEntity.status(404).body("Serviço não encontrado");
        }
    }

    //Busca pelo nome do serviço (Talvez nem precise)
    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<Servico>> findByName(@PathVariable("nome") String nome) {
        List<Servico> servicos = servicoService.getNomeServico(nome);
        return ResponseEntity.ok(servicos);
    }

    //Cadastrar/criar novo serviço
    @PostMapping
    public ResponseEntity<?> createServico(@RequestBody Servico servico) {
        try {
            Servico novoServico = servicoService.saveServico(servico);
            return ResponseEntity.status(201).body(novoServico);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Erro ao cadastrar serviço: " + e.getMessage());
        }
    }

    //Atualizar um serviço existente
    @PutMapping("/{id}")
    public ResponseEntity<?> updateServico(@PathVariable Integer id, @RequestBody Servico servicoAtualizado) {
        Servico servicoExistente = servicoService.findById(id);
        if (servicoExistente != null) {
            servicoAtualizado.setIdServicos(id);
            Servico atualizado = servicoService.saveServico(servicoAtualizado);
            return ResponseEntity.ok(atualizado);
        } else {
            return ResponseEntity.status(404).body("Serviço não encontrado");
        }
    }

    //Deletar um serviço
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteServico(@PathVariable Integer id) {
        Servico servico = servicoService.findById(id);
        if (servico != null) {
            servicoService.delServico(id);
            return ResponseEntity.ok("Serviço deletado com sucesso");
        } else {
            return ResponseEntity.status(404).body("Serviço não encontrado");
        }
    }
}
