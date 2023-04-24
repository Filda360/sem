package com.rezervace.sem.dto;

import com.rezervace.sem.model.Misto;
import com.rezervace.sem.model.Uzivatel;
import lombok.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RezervaceInputDto {
    @NotNull
    private LocalDateTime zacatek;

    @NotNull
    private LocalDateTime konec;

    private Integer pocetRybaru;

    private String poznamka;

    private Boolean stavPlatby;
    @NotNull
    private Uzivatel uzivatel;
    @NotNull
    private Misto misto;
}
