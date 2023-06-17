package com.rezervace.sem.service;

import com.rezervace.sem.model.Uzivatel;
import com.rezervace.sem.repo.UzivatelRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UzivatelService {
    private final UzivatelRepository uzivatelRepository;

    public UzivatelService(UzivatelRepository uzivatelRepository) {
        this.uzivatelRepository = uzivatelRepository;
    }

    public Uzivatel findByUsername(String username){return uzivatelRepository.findByUsername(username);}

    public Optional<Uzivatel> findById(Long id){
        return uzivatelRepository.findById(id);
    }

    public List<Uzivatel> findAll(){
        return uzivatelRepository.findAll();
    }

    public Uzivatel create(final Uzivatel uzivatel){
        return uzivatelRepository.save(uzivatel);
    }

    public void delete(long id){
        uzivatelRepository.deleteById(id);
    }

    public Uzivatel update(long id, Uzivatel novyUzivatel){
        Uzivatel stary = uzivatelRepository.findById(id).get();
        stary.setJmeno(novyUzivatel.getJmeno());
        stary.setPrijmeni(novyUzivatel.getPrijmeni());
        stary.setAdresa(novyUzivatel.getAdresa());
        stary.setUsername(novyUzivatel.getUsername());
        stary.setPassword(novyUzivatel.getPassword());
        uzivatelRepository.save(stary);
        return stary;
    }
}
