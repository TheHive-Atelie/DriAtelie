package com.driatelie.controller.webController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.driatelie.model.entity.Cliente;
import com.driatelie.model.entity.OrdemServico;
import com.driatelie.service.ClienteService;

@Controller
@RequestMapping("/web/clientes")
@CrossOrigin(origins = "http://localhost:5173")

public class ClienteWebController {

    @Autowired
    private ClienteService clienteService;

    // lógica para listar todos os clientes e para filtrar clientes por nome
    @GetMapping
    public String listarClientes(@RequestParam(required = false) String nome, Model model) {

        List<Cliente> clientes;

        if (nome != null && !nome.isEmpty()) {
            clientes = clienteService.getByName(nome);
        } else {
            clientes = clienteService.listAll();
        }

        model.addAttribute("clientes", clientes);
        model.addAttribute("filtroNome", nome);

        return "clientes/lista-clientes";
    }

    // lógica para criar um novo cliente
    @GetMapping("/novo")
    public String novoCliente(Model model) {
        model.addAttribute("cliente", new Cliente());
        return "clientes/form-cliente";
    }

    // lógica para editar um cliente existente
    @GetMapping("/editar/{id}")
    public String editarCliente(@PathVariable("id") Integer id, Model model, RedirectAttributes redirectAttributes) {
        try {
            Cliente cliente = clienteService.getClienteById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));

            model.addAttribute("cliente", cliente);
            return "clientes/form-cliente";

        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensagemErro", "Cliente não encontrado ou erro ao carregar.");
            return "redirect:/web/clientes";
        }
    }

    // logica para salvar os dados de um cliente
    @PostMapping("/save")
    public String salvarCliente(@ModelAttribute("cliente") Cliente cliente, RedirectAttributes redirectAttributes) {
        clienteService.saveCliente(cliente);
        redirectAttributes.addFlashAttribute("mensagemSucesso", "Cliente salvo com sucesso!");
        return "redirect:/web/clientes";
    }

    // lógica para deletar um cliente
    @GetMapping("/deletar/{id}")
    public String deletarCliente(@PathVariable("id") Integer id, RedirectAttributes redirectAttributes) {
        try {
            clienteService.deleteCliente(id);
            redirectAttributes.addFlashAttribute("mensagemSucesso", "Cliente deletado com sucesso!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensagemErro", "Erro ao deletar o cliente: " + e.getMessage());
        }

        return "redirect:/web/clientes";
    }

    // lógica para ver a lista de ordens de serviço associadas a um cliente
    @GetMapping("/{id}/servicos")
    public String listarServicosPorCliente(@PathVariable("id") Integer id, Model model,
            RedirectAttributes redirectAttributes) {
        try {
            Cliente cliente = clienteService.getClienteById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));

            List<OrdemServico> ordens = clienteService.getOrdensServicoByClienteId(id);

            if (ordens.isEmpty()) {
                model.addAttribute("mensagemInfo", "Este cliente não possui ordens de serviço.");
            }

            model.addAttribute("cliente", cliente);
            model.addAttribute("ordens", ordens);
            return "clientes/servicos-cliente";
            
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensagemErro", "Erro ao carregar serviços do cliente.");
            return "redirect:/web/clientes";
        }
    }

}