package com.rezervace.sem.repo;

import com.rezervace.sem.model.Uzivatel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UzivatelRepository extends JpaRepository<Uzivatel, Long> {
    Uzivatel findByUsername(String username);
}
