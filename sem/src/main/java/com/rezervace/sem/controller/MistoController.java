package com.rezervace.sem.controller;

import com.rezervace.sem.dto.MistaAndNumberOfPageDto;
import com.rezervace.sem.dto.MistoInputDto;
import com.rezervace.sem.dto.MistoOutputDtoAll;
import com.rezervace.sem.dto.RevirOutputDtoAll;
import com.rezervace.sem.exception.ResourceNotFoundException;
import com.rezervace.sem.model.Misto;
import com.rezervace.sem.service.MistoService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mista")
@CrossOrigin(origins = {"http://localhost:5173/"})
public class MistoController {

    private ModelMapper modelMapper;

    private MistoService mistoService;

    public MistoController(ModelMapper modelMapper, MistoService mistoService) {
        this.modelMapper = modelMapper;
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        this.mistoService = mistoService;
    }

    @PostMapping()
    public void pridejMisto(@Valid @RequestBody MistoInputDto misto) {
        Misto mis = modelMapper.map(misto, Misto.class);
        mistoService.create(mis);
    }

    @GetMapping
    public ResponseEntity<?> dejVsechnyMista(
            @RequestParam(name = "revir", required = false) String revir,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "4") int size,
            @RequestParam(name = "sort", defaultValue = "nazev") String sort) {
        try {
            List<Order> orders = new ArrayList<Order>();

            orders.add(new Order(Sort.Direction.ASC, sort));

            List<Misto> mista = new ArrayList<Misto>();
            Pageable pagingSort = PageRequest.of(page, size, Sort.by(orders));

            Page<Misto> pageTuts;
            if (revir == null)
                pageTuts = mistoService.findAll(pagingSort);
            else
                pageTuts = mistoService.findByRevir(revir, pagingSort);

            mista = pageTuts.getContent();
            int totalPages = pageTuts.getTotalPages();

            if (mista.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            MistaAndNumberOfPageDto response = new MistaAndNumberOfPageDto(mista.stream().map(misto -> modelMapper.map(misto, MistoOutputDtoAll.class)).collect(Collectors.toList()), totalPages);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity dejMistoDleId(@PathVariable Long id) {
        var result = mistoService.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException();
        }
        return ResponseEntity.ok(modelMapper.map(result.get(), MistoOutputDtoAll.class));
    }

    @DeleteMapping("/{id}")
    public void deleteMisto(@PathVariable Long id) {
        mistoService.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity replaceMisto(@RequestBody MistoInputDto mistoUpdated, @PathVariable Long id) {
        Misto mis = modelMapper.map(mistoUpdated, Misto.class);
        var result = mistoService.update(id, mis);
        return ResponseEntity.status(HttpStatus.OK).body(modelMapper.map(result, RevirOutputDtoAll.class));
    }
}
