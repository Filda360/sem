package com.rezervace.sem.dto;

import lombok.*;

import javax.persistence.Column;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UzivatelOutputDtoAll {
    private String jmeno;

    private String prijmeni;

    private String adresa;

    private String telefon;

    private String email;

    private String role;

}
