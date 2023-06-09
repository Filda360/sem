package com.rezervace.sem.repo;

import com.rezervace.sem.model.Rezervace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RezervaceRepository extends PagingAndSortingRepository<Rezervace, Long> {
    public Page<Rezervace> findRezervacesByUzivatel_Username(String username, Pageable pageable);

    public List<Rezervace> findAllByUzivatel_UsernameOrderByZacatek(String username);

    public List<Rezervace> findAllByMisto_NazevAndMisto_Revir_Nazev(String misto, String revir);
}
