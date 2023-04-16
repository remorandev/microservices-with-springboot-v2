package dev.bitman.microservice.multiplication.config;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Configuración para evitar que Jackson active las relaciones LAZY mientras serializa.
@Configuration
public class JsonConfiguration {

    @Bean
    public Module hibernateModule() {
        return new Hibernate5Module();
    }
}
