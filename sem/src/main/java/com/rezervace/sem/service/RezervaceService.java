package com.rezervace.sem.service;

import com.rezervace.sem.model.Rezervace;
import com.rezervace.sem.repo.RezervaceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RezervaceService {
    private final RezervaceRepository rezervaceRepository;

    public RezervaceService(RezervaceRepository rezervaceRepository) {
        this.rezervaceRepository = rezervaceRepository;
    }

    public Optional<Rezervace> findById(Long id){
        return rezervaceRepository.findById(id);
    }

    public Page<Rezervace> findAll(Pageable pageable){
        return rezervaceRepository.findAll(pageable);
    }

    public Page<Rezervace> findByUzivatel(String username, Pageable pageable){
        return rezervaceRepository.findRezervacesByUzivatel_Username(username, pageable);
    }

    public Optional<Rezervace> findByUser(Long userId){
        return rezervaceRepository.findById(userId);
    }


    public Rezervace create(final Rezervace rezervace){
        return rezervaceRepository.save(rezervace);
    }

    public void delete(long id){
        rezervaceRepository.deleteById(id);
    }

    public Rezervace update(long id, Rezervace novaRezervace){
        Rezervace stary = rezervaceRepository.findById(id).get(); //TODO
        stary.setKonec(novaRezervace.getKonec());
        stary.setZacatek(novaRezervace.getZacatek());
        stary.setPoznamka(novaRezervace.getPoznamka());
        stary.setPocetRybaru(novaRezervace.getPocetRybaru());
        stary.setStavPlatby(novaRezervace.getStavPlatby());
        stary.setMisto(novaRezervace.getMisto());
        stary.setUzivatel(novaRezervace.getUzivatel());
        rezervaceRepository.save(stary);
        return stary;
    }
}
