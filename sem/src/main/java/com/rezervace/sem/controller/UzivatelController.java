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
import java.security.Principal;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/uzivatele")
@CrossOrigin(origins = {"http://localhost:5173/"})
public class UzivatelController {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UzivatelService uzivatelService;

    @PostMapping
    public void pridejUzivatele(@Valid @RequestBody UzivatelInputDto uzivatel){
        Uzivatel uz = modelMapper.map(uzivatel, Uzivatel.class);
        uz.setRole("USER");
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
        Optional<Uzivatel> uz = uzivatelService.findById(id);
        if(uz.get().getRole().equals("ADMIN")) {
            throw new IllegalArgumentException();
        }else {
            uzivatelService.delete(id);
        }
    }

    @PutMapping
    public ResponseEntity replaceUser(@RequestBody UzivatelInputDto uzivatel, Principal user) {
        Uzivatel uzStary= uzivatelService.findByUsername(user.getName());
        Uzivatel uzNovy = modelMapper.map(uzivatel, Uzivatel.class);
        if(uzStary.getRole().equals("USER")) uzNovy.setRole("USER");
        var result = uzivatelService.update(uzStary.getId(), uzNovy);
        return ResponseEntity.status(HttpStatus.OK).body(modelMapper.map(result, UzivatelOutputDtoAll.class));
    }



}
