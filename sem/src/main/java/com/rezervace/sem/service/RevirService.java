package com.rezervace.sem.service;


import com.rezervace.sem.model.Revir;
import com.rezervace.sem.repo.RevirRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class RevirService {
    private final RevirRepository revirRepository;

    public RevirService(RevirRepository revirRepository) {
        this.revirRepository = revirRepository;
    }

    public Optional<Revir> findById(Long id){
        return revirRepository.findById(id);
    }

    public List<Revir> findAll(){
        return revirRepository.findAll();
    }

    public Revir create(final Revir revir){
        return revirRepository.save(revir);
    }

    public void delete(long id){
        revirRepository.deleteById(id);
    }

    public Revir update(long id, Revir novyRevir){
        Revir stary = revirRepository.findById(id).get(); //TODO
        stary.setNazev(novyRevir.getNazev());
        stary.setPopis(novyRevir.getPopis());
        revirRepository.save(stary);
        return stary;
    }
}
