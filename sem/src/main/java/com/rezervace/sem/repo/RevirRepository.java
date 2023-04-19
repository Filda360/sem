package com.rezervace.sem.repo;

import com.rezervace.sem.model.Revir;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RevirRepository extends JpaRepository<Revir, Long> {
}
