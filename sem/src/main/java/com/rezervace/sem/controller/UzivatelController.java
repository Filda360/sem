package com.rezervace.sem.controller;

import com.rezervace.sem.dto.UzivatelInputDto;
import org.modelmapper.ModelMapper;
import com.rezervace.sem.dto.UzivatelOutputDtoAll;
import com.rezervace.sem.exception.ResourceNotFoundException;
import com.rezervace.sem.model.Uzivatel;
import com.rezervace.sem.service.UzivatelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/uzivatele")
public class UzivatelController {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UzivatelService uzivatelService;

    @PostMapping
    public void pridejUzivatele(@Valid @RequestBody UzivatelInputDto uzivatel){
        Uzivatel uz = modelMapper.map(uzivatel, Uzivatel.class);
        uz.setRole("rybar");
        uzivatelService.create(uz);
    }

    @GetMapping
    public ResponseEntity dejVsechnyUzivatele(){
       return ResponseEntity.ok(uzivatelService.findAll().stream().map(uzivatel -> modelMapper.map(uzivatel, UzivatelOutputDtoAll.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity dejUzivateleDleId(@PathVariable Long id){
        var result = uzivatelService.findById(id);
        if(result.isEmpty()) {
            throw new ResourceNotFoundException();
        }
        return ResponseEntity.ok(modelMapper.map(result.get(), UzivatelOutputDtoAll.class));
    }

    @DeleteMapping("/{id}")
    void deleteUser(@PathVariable Long id) {
        uzivatelService.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity replaceUser(@RequestBody UzivatelInputDto uzivatel, @PathVariable Long id) {
        Uzivatel uz = modelMapper.map(uzivatel, Uzivatel.class);
        var result = uzivatelService.update(id, uz);
        return ResponseEntity.status(HttpStatus.OK).body(modelMapper.map(result, UzivatelOutputDtoAll.class));
    }



}
