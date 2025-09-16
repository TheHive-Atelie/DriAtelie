// backend/src/main/java/com/driatelie/controller/TesteController.java
package com.driatelie.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TesteController {
    
    @GetMapping("/mensagem")
    public String getMensagem() {
        return "✅ Backend Spring Boot funcionando!";
    }
}