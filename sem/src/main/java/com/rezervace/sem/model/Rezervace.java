package com.rezervace.sem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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


    @ManyToOne
    @JoinColumn(name = "idUzivatele")
    private Uzivatel uzivatel;


    @ManyToOne
    @JoinColumn(name = "idMista")
    private Misto misto;
}
