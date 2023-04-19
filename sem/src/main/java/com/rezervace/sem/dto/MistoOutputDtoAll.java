package com.rezervace.sem.dto;

import lombok.*;

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
}
