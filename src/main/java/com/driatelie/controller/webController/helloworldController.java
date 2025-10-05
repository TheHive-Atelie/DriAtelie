package com.driatelie.controller.webController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gudinite")
public class helloworldController {
    @RequestMapping
    public String hello() {
        return "Good night!";
    }
}
