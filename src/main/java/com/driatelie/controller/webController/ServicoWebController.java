package com.driatelie.controller.webController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.driatelie.model.entity.Servico;
import com.driatelie.service.ServicoService;

@Controller
@RequestMapping("/web/servicos")
@CrossOrigin(origins = "http://localhost:5173")
public class ServicoWebController {

    @Autowired
    private ServicoService servicoService;

    // listar todos os serviços
    @GetMapping
    public String listarServicos(Model model) {
        return "app";
    }

    @GetMapping("/teste")
    public String teste() {
        return "testeTemplate";
    }

    // adicionando novo serviço via formulário
    @GetMapping("/novo")
    public String novoServico(Model model) {
        model.addAttribute("servico", new Servico());
        return "servicos/form-servico";
    }

    // editar serviço existente
    @GetMapping("/editar/{id}")
    public String editarServico(@PathVariable("id") Integer id, Model model, RedirectAttributes redirectAttributes) {
        try {
            Servico servico = servicoService.findById(id);
            if (servico == null) {
                redirectAttributes.addFlashAttribute("mensagemErro", "Serviço não encontrado.");
                return "redirect:/web/servicos";
            }

            model.addAttribute("servico", servico);
            return "servicos/form-servico";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensagemErro", "Erro ao carregar o serviço.");
            return "redirect:/web/servicos";
        }
    }

    // salvar serviço (novo ou editado)
    @PostMapping("/save")
    public String salvarServico(@ModelAttribute("servico") Servico servico, RedirectAttributes redirectAttributes) {
        try {
            servicoService.saveServico(servico);
            redirectAttributes.addFlashAttribute("mensagemSucesso", "Serviço salvo com sucesso!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensagemErro", "Erro ao salvar o serviço: " + e.getMessage());
        }

        return "redirect:/web/servicos";
    }

    // deletar serviço
    @GetMapping("/deletar/{id}")
    public String deletarServico(@PathVariable("id") Integer id, RedirectAttributes redirectAttributes) {
        try {
            Servico servico = servicoService.findById(id);
            if (servico == null) {
                redirectAttributes.addFlashAttribute("mensagemErro", "Serviço não encontrado.");
            } else {
                servicoService.delServico(id);
                redirectAttributes.addFlashAttribute("mensagemSucesso", "Serviço deletado com sucesso!");
            }
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensagemErro", "Erro ao deletar o serviço: " + e.getMessage());
        }

        return "redirect:/web/servicos";
    }
}
