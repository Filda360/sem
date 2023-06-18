package com.rezervace.sem.service;

import com.rezervace.sem.model.Misto;
import com.rezervace.sem.model.Revir;
import com.rezervace.sem.repo.MistoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MistoService {
    private final MistoRepository mistoRepository;

    public MistoService(MistoRepository mistoRepository) {
        this.mistoRepository = mistoRepository;
    }

    public Optional<Misto> findById(Long id) {
        return mistoRepository.findById(id);
    }

    public Page<Misto> findByRevir(String revir, Pageable pagingSort) {
        return mistoRepository.findMistosByRevir_Nazev(revir, pagingSort);
    }

    public Page<Misto> findAll(Pageable pagingSort) {
        return mistoRepository.findAll(pagingSort);
    }

    public Misto create(final Misto misto) {
        return mistoRepository.save(misto);
    }

    public void delete(long id) {
        mistoRepository.deleteMistoReservations(id);
        mistoRepository.deleteById(id);
    }

    public Misto update(long id, Misto noveMisto) {
        Misto stary = mistoRepository.findById(id).get(); //TODO
        stary.setNazev(noveMisto.getNazev());
        stary.setCena(noveMisto.getCena());
        stary.setPopis(noveMisto.getPopis());
        stary.setObrazek(noveMisto.getObrazek());
        stary.setMaxPocetRybaru(noveMisto.getMaxPocetRybaru());
        stary.setRevir(noveMisto.getRevir());
        mistoRepository.save(stary);
        return stary;
    }
}
