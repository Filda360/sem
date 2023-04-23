package com.rezervace.sem.dto;

import com.rezervace.sem.model.Revir;
import lombok.*;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MistoOutputDtoAll {
    private String nazev;

    private Integer cena;

    private Integer maxPocetRybaru;

    private String popis;

    private String obrazek;

    private RevirOutputDtoAll revir;
}
