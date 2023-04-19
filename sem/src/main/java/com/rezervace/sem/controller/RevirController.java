package com.rezervace.sem.controller;

import com.rezervace.sem.dto.RevirInputDto;
import com.rezervace.sem.dto.RevirOutputDtoAll;
import com.rezervace.sem.exception.ResourceNotFoundException;
import com.rezervace.sem.model.Revir;
import com.rezervace.sem.service.RevirService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reviry")
public class RevirController {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private RevirService revirService;

    @PostMapping
    public void pridejRevir(@Valid @RequestBody RevirInputDto revir) {
        Revir rev = modelMapper.map(revir, Revir.class);
        revirService.create(rev);
    }

    @GetMapping
    public ResponseEntity dejVsechnyReviry() {
        return ResponseEntity.ok(revirService.findAll().stream().map(revir -> modelMapper.map(revir, RevirOutputDtoAll.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity dejRevirDleId(@PathVariable Long id) {
        var result = revirService.findById(id);
        if(result.isEmpty()) {
            throw new ResourceNotFoundException();
        }
        return ResponseEntity.ok(modelMapper.map(result.get(), RevirOutputDtoAll.class));
    }
    @DeleteMapping("/{id}")
    public void deleteRevir(@PathVariable Long id){
        revirService.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity replaceRevir(@RequestBody RevirInputDto revir, @PathVariable Long id) {
        Revir rev = modelMapper.map(revir, Revir.class);
        var result = revirService.update(id, rev);
        return ResponseEntity.status(HttpStatus.OK).body(modelMapper.map(result, RevirOutputDtoAll.class));
    }
}
