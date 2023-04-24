package com.rezervace.sem.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "misto")
public class Misto {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String nazev;
    @Column
    private Integer cena;
    @Column
    private Integer maxPocetRybaru;
    @Column
    private String popis;
    @Column
    private String obrazek;


    @OneToMany(mappedBy = "misto", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    //@JsonBackReference("misto")
    private Set<Rezervace> rezervace;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idReviru")
    private Revir revir;
}
