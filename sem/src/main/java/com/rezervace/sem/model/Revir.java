package com.rezervace.sem.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name="revir")
public class Revir {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String nazev;
    @Column
    private String popis;


    @OneToMany(mappedBy = "revir", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    //@JsonBackReference
    private Set<Misto> mista_reviru;
}
