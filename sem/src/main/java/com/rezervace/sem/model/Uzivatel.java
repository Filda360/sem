package com.rezervace.sem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
@Entity
@Table(name = "uzivatel")
public class Uzivatel {
    @Id
    @GeneratedValue
    private Long id;
    @Column
    private String jmeno;
    @Column
    private String prijmeni;
    @Column
    private String adresa;
    @Column
    private String telefon;
    @Column
    private String email;
    @Column
    private String role;
    @Column(unique = true)
    private String username;
    @Column
    private String password;

    @OneToMany(mappedBy = "uzivatel", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private Set<Rezervace> rezervace;
}
