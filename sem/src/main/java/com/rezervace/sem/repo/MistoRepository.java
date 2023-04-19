package com.rezervace.sem.repo;

import com.rezervace.sem.model.Misto;
import com.rezervace.sem.model.Revir;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MistoRepository extends PagingAndSortingRepository<Misto, Long> {
    public Page<Misto> findMistosByRevir_Nazev(String revir, Pageable pageable);
}
