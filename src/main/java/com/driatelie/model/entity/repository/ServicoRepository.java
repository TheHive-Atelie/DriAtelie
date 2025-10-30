package com.driatelie.model.entity.repository;

import com.driatelie.model.entity.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Integer> {

    // Busca serviços por nome (parcial e sem diferenciar maiúsculas/minúsculas)
    List<Servico> findByNomeTipoServicoContainingIgnoreCase(String nomeTipoServico);
}
