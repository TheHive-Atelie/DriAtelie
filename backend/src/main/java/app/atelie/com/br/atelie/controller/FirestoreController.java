package app.atelie.com.br.atelie.controller;

import app.atelie.com.br.atelie.service.FirestoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/firebase")  // ← base URL mais clara
public class FirestoreController {

    @Autowired
    private FirestoreService firestoreService;

    // Ex: POST http://localhost:8080/api/firebase/usuarios/123
    @PostMapping("/{collection}/{documentId}")
    public String salvar(@PathVariable String collection,
                         @PathVariable String documentId,
                         @RequestBody Map<String, Object> dados) {
        try {
            return firestoreService.save(collection, documentId, dados);
        } catch (Exception e) {
            return "Erro ao salvar: " + e.getMessage();
        }
    }

    // Ex: GET http://localhost:8080/api/firebase/usuarios/123
    @GetMapping("/{collection}/{documentId}")
    public Map<String, Object> buscar(@PathVariable String collection,
                                      @PathVariable String documentId) {
        try {
            return firestoreService.getById(collection, documentId);
        } catch (Exception e) {
            Map<String, Object> erro = new HashMap<>();
            erro.put("erro", e.getMessage());
            return erro;
        }
    }
}