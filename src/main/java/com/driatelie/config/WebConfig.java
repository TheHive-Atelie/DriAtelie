package com.driatelie.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Redirecionar rotas raiz para /web/
        registry.addRedirectViewController("/", "/web/");
        registry.addRedirectViewController("/clientes", "/web/clientes");
        registry.addRedirectViewController("/servicos", "/web/servicos");
        registry.addRedirectViewController("/comandas", "/web/comandas");
        registry.addRedirectViewController("/financas", "/web/financas");
    }
}
