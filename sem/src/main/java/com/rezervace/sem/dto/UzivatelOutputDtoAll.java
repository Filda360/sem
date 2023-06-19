package com.rezervace.sem.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UzivatelOutputDtoAll {
    private Long id;
    private String jmeno;

    private String prijmeni;

    private String username;

    private String adresa;

    private String telefon;

    private String email;

    private String role;

}
