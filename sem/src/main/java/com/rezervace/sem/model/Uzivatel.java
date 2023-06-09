package com.rezervace.sem.model;


import lombok.Data;

import javax.persistence.*;
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

    @OneToMany(mappedBy = "uzivatel", cascade = CascadeType.ALL)
    //@JsonBackReference("uzivatel")
    private Set<Rezervace> rezervace;

}
