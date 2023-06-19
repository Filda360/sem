package com.rezervace.sem.service;

import com.rezervace.sem.model.Rezervace;
import com.rezervace.sem.model.Uzivatel;
import com.rezervace.sem.repo.RezervaceRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class RezervaceServiceTest {

    @Mock
    private RezervaceRepository rezervaceRepository;

    @Test
    public void testFindAllReservedDaysByMisto() {

        RezervaceService rezervaceService = new RezervaceService(rezervaceRepository);
        String nazev = "ExampleMisto";
        String revir = "ExampleRevir";

        Rezervace rezervace1 = new Rezervace();
        rezervace1.setZacatek(Timestamp.valueOf("2023-06-01 00:00:00").toLocalDateTime());
        rezervace1.setKonec(Timestamp.valueOf("2023-06-03 23:59:59").toLocalDateTime());

        Rezervace rezervace2 = new Rezervace();
        rezervace2.setZacatek(Timestamp.valueOf("2023-06-05 00:00:00").toLocalDateTime());
        rezervace2.setKonec(Timestamp.valueOf("2023-06-07 23:59:59").toLocalDateTime());

        List<Rezervace> rezervaceList = Arrays.asList(rezervace1, rezervace2);

        when(rezervaceRepository.findAllByMisto_NazevAndMisto_Revir_Nazev(nazev, revir))
                .thenReturn(rezervaceList);

        List<LocalDate> expectedReservedDays = Arrays.asList(
                LocalDate.parse("2023-06-01"),
                LocalDate.parse("2023-06-02"),
                LocalDate.parse("2023-06-03"),
                LocalDate.parse("2023-06-05"),
                LocalDate.parse("2023-06-06"),
                LocalDate.parse("2023-06-07")
        );

        List<LocalDate> reservedDays = rezervaceService.findAllReservedDaysByMisto(nazev, revir);

        assertEquals(expectedReservedDays, reservedDays);
    }

    @Test
    public void testFindByUzivatel() {
        RezervaceService rezervaceService = new RezervaceService(rezervaceRepository);
        String username = "filip";
        Uzivatel user = new Uzivatel();
        user.setUsername(username);

        Rezervace rezervace1 = new Rezervace();
        rezervace1.setId(1L);
        rezervace1.setUzivatel(user);

        Rezervace rezervace2 = new Rezervace();
        rezervace2.setId(2L);
        rezervace2.setUzivatel(user);

        List<Rezervace> rezervaceList = new ArrayList<>();
        rezervaceList.add(rezervace1);
        rezervaceList.add(rezervace2);

        when(rezervaceRepository.findAllByUzivatel_UsernameOrderByZacatek(username))
                .thenReturn(rezervaceList);

        List<Rezervace> rezervaceByUzivatel = rezervaceService.findAllByUzivatel(username);

        assertEquals(rezervaceList, rezervaceByUzivatel);
    }
}