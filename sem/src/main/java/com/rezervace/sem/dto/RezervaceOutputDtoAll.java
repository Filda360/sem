package com.rezervace.sem.dto;

import lombok.*;

import java.time.LocalDateTime;
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RezervaceOutputDtoAll {
    private Long id;
    private LocalDateTime zacatek;

    private LocalDateTime konec;

    private Integer pocetRybaru;

    private String poznamka;

    private Boolean stavPlatby;

    private UzivatelOutputDtoAll uzivatel;

    private MistoOutputDtoAll misto;

}
