package com.rezervace.sem.repo;

import com.rezervace.sem.model.Uzivatel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface UzivatelRepository extends JpaRepository<Uzivatel, Long> {
    Uzivatel findByUsername(String username);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM rezervace WHERE id_uzivatele = :id", nativeQuery = true)
    void deleteUserReservations(@Param("id") Long uid);
}
