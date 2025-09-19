package com.driatelie.repository;

import com.driatelie.model.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// Interface que herda de JpaRepository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    // Exemplo de método customizado
    List<Cliente> findByNomeContainingIgnoreCase(String nome);
}
