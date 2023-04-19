package com.rezervace.sem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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


    @OneToMany(mappedBy = "revir", cascade = CascadeType.REMOVE)
    private Set<Misto> mista_reviru;
}
