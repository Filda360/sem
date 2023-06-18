package com.rezervace.sem.dto;

import lombok.*;

import java.util.List;
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MistaAndNumberOfPageDto {
    private List<MistoOutputDtoAll> mista;
    private int totalPages;

}
