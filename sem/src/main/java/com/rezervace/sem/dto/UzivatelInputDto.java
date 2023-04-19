package com.rezervace.sem.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UzivatelInputDto {
    @NotBlank
    private String jmeno;
    @NotBlank
    private String prijmeni;

    @NotBlank
    private String adresa;
    @NotBlank
    private String telefon;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
