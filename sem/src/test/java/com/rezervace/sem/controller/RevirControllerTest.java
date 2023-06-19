package com.rezervace.sem.controller;

import com.rezervace.sem.dto.RevirOutputDtoAll;
import com.rezervace.sem.model.Revir;
import com.rezervace.sem.security.JWTTokenHelper;
import com.rezervace.sem.service.RevirService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringJUnitConfig
@WebMvcTest(RevirController.class)
public class RevirControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private RevirService revirService;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JWTTokenHelper jwtTokenHelper;
    @MockBean
    private AuthenticationEntryPoint authenticationEntryPoint;
    @Mock
    private ModelMapper modelMapper;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testDejVsechnyReviry() throws Exception {
        Revir revir1 = new Revir();
        revir1.setId(1L);
        revir1.setNazev("Revir 1");
        revir1.setPopis("Popis 1");
        Revir revir2 = new Revir();
        revir2.setId(2L);
        revir2.setNazev("Revir 2");
        revir2.setPopis("Popis 2");

        List<Revir> reviry = Arrays.asList(
                revir1,
                revir2
        );

        when(revirService.findAll()).thenReturn(reviry);
        when(modelMapper.map(Mockito.any(Revir.class), Mockito.any(Class.class))).thenReturn(new RevirOutputDtoAll());
        String expectedResponse = "[{\"id\": 1, \"nazev\": \"Revir 1\",\"popis\": \"Popis 1\"},{\"id\": 2, \"nazev\": \"Revir 2\",\"popis\": \"Popis 2\"}]";

        mockMvc.perform(get("/reviry"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(expectedResponse, false));
    }

}
