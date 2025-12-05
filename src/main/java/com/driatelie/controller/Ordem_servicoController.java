package com.driatelie.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driatelie.model.entity.Ordem_servico;
import com.driatelie.dto.OrdemServicoDTO;
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
    public ResponseEntity<List<OrdemServicoDTO>> listAll() {
        List<Ordem_servico> ordem_servicos = ordem_servicoService.listAll();
        List<OrdemServicoDTO> dto = ordem_servicos.stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findByIs(@PathVariable Integer id) {
        List<Ordem_servico> ordem_servicos = ordem_servicoService.getOrdem_servicosById(id);
        if (!ordem_servicos.isEmpty()) {
            List<OrdemServicoDTO> dto = ordem_servicos.stream().map(this::toDto).collect(Collectors.toList());
            return ResponseEntity.ok(dto);
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
                List<OrdemServicoDTO> dto = ordem_servicos.stream().map(this::toDto).collect(Collectors.toList());
                return ResponseEntity.ok(dto);
            } else {
                return ResponseEntity.status(404).body("Nenhuma ordem de serviço encontrada para a data especificada");
            }
        } catch (java.time.format.DateTimeParseException ex) {
            return ResponseEntity.badRequest().body("Formato de data inválido. Use yyyy-MM-dd");
        }
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<?> findByClienteId(@PathVariable Integer clienteId) {
        List<Ordem_servico> ordem_servicos = ordem_servicoService.getOrdem_servicosByClienteId(clienteId);
        if (!ordem_servicos.isEmpty()) {
            List<OrdemServicoDTO> dto = ordem_servicos.stream().map(this::toDto).collect(Collectors.toList());
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(404).body("Nenhuma ordem de serviço encontrada para este cliente");
        }
    }
    
    
    @PostMapping
    public ResponseEntity<?> newOrdem_servico(@RequestBody OrdemServicoDTO dto) {
        try {
            Ordem_servico ordem = new Ordem_servico();
            Integer effectiveClienteId = dto.getEffectiveClienteId();
            if (effectiveClienteId != null) {
                com.driatelie.model.entity.Cliente cliente = new com.driatelie.model.entity.Cliente();
                cliente.setId(effectiveClienteId);
                ordem.setCliente(cliente);
            }
            Integer effectiveServicoId = dto.getEffectiveServicoId();
            if (effectiveServicoId != null) {
                com.driatelie.model.entity.Servico servico = new com.driatelie.model.entity.Servico();
                servico.setId_servicos(effectiveServicoId);
                ordem.setServico(servico);
            } else {
                return ResponseEntity.badRequest().body("Campo 'servicoId' é obrigatório");
            }
            ordem.setData(dto.getData());
            ordem.setValorTotal(dto.getValorTotal());
            ordem.setSinal(dto.getSinal());
            ordem.setTipoPagamento(dto.getTipoPagamento());
            ordem.setObservacoes(dto.getObservacoes());

            Ordem_servico novaOrdem_servico = ordem_servicoService.saveOrdem_servico(ordem);
            OrdemServicoDTO result = toDto(novaOrdem_servico);
            return ResponseEntity.status(201).body(result);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Erro interno: " + ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrdem_servicoById(@PathVariable Integer id, @RequestBody Ordem_servico ordem_servicoAtualizado) {
        List<Ordem_servico> ordem_servicosExistentes = ordem_servicoService.getOrdem_servicosById(id);
        if (!ordem_servicosExistentes.isEmpty()) {
            ordem_servicoAtualizado.setId(id);
            try {
                Ordem_servico atualizado = ordem_servicoService.saveOrdem_servico(ordem_servicoAtualizado);
                return ResponseEntity.ok(toDto(atualizado));
            } catch (IllegalArgumentException ex) {
                return ResponseEntity.badRequest().body(ex.getMessage());
            } catch (Exception ex) {
                ex.printStackTrace();
                return ResponseEntity.status(500).body("Erro interno: " + ex.getMessage());
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

    private OrdemServicoDTO toDto(Ordem_servico o) {
        Integer clienteId = null;
        String clienteNome = null;
        Integer servicoId = null;
        String servicoNome = null;
        try {
            if (o.getCliente() != null) {
                clienteId = o.getCliente().getId();
                clienteNome = o.getCliente().getNome();
            }
            if (o.getServico() != null) {
                servicoId = o.getServico().getId_servicos();
                servicoNome = o.getServico().getNomeTipoServico();
            }
        } catch (Exception ex) {
            // in case proxy/LAZY causes issues, fall back to nulls
        }

        OrdemServicoDTO dto = new OrdemServicoDTO();
        dto.setId(o.getId());
        dto.setClienteId(clienteId);
        dto.setClienteNome(clienteNome);
        dto.setData(o.getData());
        dto.setValorTotal(o.getValorTotal());
        dto.setSinal(o.getSinal());
        dto.setTipoPagamento(o.getTipoPagamento());
        dto.setObservacoes(o.getObservacoes());
        dto.setServicoId(servicoId);
        dto.setServicoNome(servicoNome);
        return dto;
    }
}