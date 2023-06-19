package com.rezervace.sem.repo;

import com.rezervace.sem.model.Misto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface MistoRepository extends PagingAndSortingRepository<Misto, Long> {
    public Page<Misto> findMistosByRevir_Nazev(String revir, Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM rezervace WHERE id_mista = :id", nativeQuery = true)
    void deleteMistoReservations(@Param("id") Long uid);
}
