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
    @NotBlank
    private LocalDateTime zacatek;

    @NotBlank
    private LocalDateTime konec;

    @NotBlank
    @Min(1)
    @Max(3)
    private Integer pocetRybaru;

    private String poznamka;
    @NotNull
    private Uzivatel uzivatel;
    @NotNull
    private Misto misto;
}
