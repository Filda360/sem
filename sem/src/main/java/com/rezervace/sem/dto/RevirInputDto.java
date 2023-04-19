package com.rezervace.sem.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RevirInputDto {

    @NotBlank
    private String nazev;

    private String popis;
}
