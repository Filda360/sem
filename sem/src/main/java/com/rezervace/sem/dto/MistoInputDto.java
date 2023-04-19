package com.rezervace.sem.dto;

import com.rezervace.sem.model.Revir;
import lombok.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MistoInputDto {

    @NotBlank
    private String nazev;
    @NotNull
    private Integer cena;
    @NotNull
    private Integer maxPocetRybaru;

    private String popis;

    private String obrazek;
    @NotNull
    private Revir revir;
}
