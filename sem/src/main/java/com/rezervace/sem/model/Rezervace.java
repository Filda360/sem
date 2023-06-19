package com.rezervace.sem.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "rezervace")
public class Rezervace {
    @Id
    @GeneratedValue
    private Long id;
    @Column
    private LocalDateTime zacatek;
    @Column
    private LocalDateTime konec;
    @Column
    private Integer pocetRybaru;
    @Column
    private String poznamka;
    @Column
    private Boolean stavPlatby;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUzivatele")
    //@JsonManagedReference("uzivatel")
    private Uzivatel uzivatel;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idMista")
    //@JsonManagedReference("misto")
    private Misto misto;
}
