package com.driatelie.driah.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class helloworldController {
    @RequestMapping
    public String hello() {
        return "Hello World!";
    }
}
