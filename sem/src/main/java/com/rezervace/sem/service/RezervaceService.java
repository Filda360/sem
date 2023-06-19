package com.rezervace.sem.service;

import com.rezervace.sem.model.Rezervace;
import com.rezervace.sem.repo.RezervaceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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

    public List<Rezervace> findAllByUzivatel(String username){
        return rezervaceRepository.findAllByUzivatel_UsernameOrderByZacatek(username);
    }

    public List<LocalDate> findAllReservedDaysByMisto(String nazev, String revir){
        List<Rezervace> rezervace = rezervaceRepository.findAllByMisto_NazevAndMisto_Revir_Nazev(nazev, revir);
        List<LocalDate> rezervovaneDny = new ArrayList<>();
        for(int i = 0; i < rezervace.size(); i++) {
            rezervovaneDny.addAll(getDatesBetweenStartEnd(rezervace.get(i).getZacatek().toLocalDate(), rezervace.get(i).getKonec().toLocalDate()));
        }
        return rezervovaneDny;
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

    private List<LocalDate> getDatesBetweenStartEnd(
            LocalDate startDate, LocalDate endDate) {
        if (startDate.equals(endDate)) return Collections.singletonList(startDate);
        long numOfDaysBetween = ChronoUnit.DAYS.between(startDate, endDate);
        List<LocalDate> dny = IntStream.iterate(0, i -> i + 1)
                .limit(numOfDaysBetween)
                .mapToObj(i -> startDate.plusDays(i))
                .collect(Collectors.toList());
        dny.add(startDate);
        dny.add(endDate);
        return dny;
    }
}
