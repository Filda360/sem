package com.rezervace.sem.controller;

import com.rezervace.sem.dto.RevirOutputDtoAll;
import com.rezervace.sem.dto.RezervaceInputDto;
import com.rezervace.sem.dto.RezervaceOutputDtoAll;
import com.rezervace.sem.exception.ResourceNotFoundException;
import com.rezervace.sem.model.Rezervace;
import com.rezervace.sem.service.RezervaceService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.InvalidParameterException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rezervace")
@CrossOrigin(origins = {"http://localhost:5173/"})
public class RezervaceController {
    //@Autowired
    private ModelMapper modelMapper;

    //@Autowired
    private RezervaceService rezervaceService;

    public RezervaceController(ModelMapper modelMapper, RezervaceService rezervaceService) {
        this.modelMapper = modelMapper;
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        this.rezervaceService = rezervaceService;
    }

    @PostMapping
    public void pridejRezervaci(@Valid @RequestBody RezervaceInputDto rezervaceNova) {
        Rezervace rez = modelMapper.map(rezervaceNova, Rezervace.class);
        rez.setStavPlatby(false);
        rezervaceService.create(rez);
    }

    @GetMapping
    public ResponseEntity dejVsechnyRezervace(
            @RequestParam(name = "username", required = false) String username,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "3") int size,
            @RequestParam(name = "sort", defaultValue = "zacatek") String[] sort) {
        try {
            List<Order> orders = new ArrayList<Order>();

            if (sort[0].contains(",")) {
                // will sort more than 2 fields
                // sortOrder="field, direction"
                for (String sortOrder : sort) {
                    orders.add(new Order(Sort.Direction.ASC, sortOrder));
                }
            } else {
                // sort=[field, direction]
                orders.add(new Order(Sort.Direction.ASC, sort[0]));
            }

            List<Rezervace> rezervace = new ArrayList<Rezervace>();
            Pageable pagingSort = PageRequest.of(page, size, Sort.by(orders));

            Page<Rezervace> pageTuts;
            if (username == null)
                pageTuts = rezervaceService.findAll(pagingSort);
            else
                pageTuts = rezervaceService.findByUzivatel(username, pagingSort);

            rezervace = pageTuts.getContent();

            if (rezervace.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return ResponseEntity.ok(rezervace.stream().map(misto -> modelMapper.map(misto, RezervaceOutputDtoAll.class)).collect(Collectors.toList()));

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user")
    public ResponseEntity dejRezervaceUzivatele(Principal user){
        var result = rezervaceService.findAllByUzivatel(user.getName());
        if (result.isEmpty()) {
            throw new ResourceNotFoundException();
        }
        return ResponseEntity.ok(result.stream().map(rezervace -> modelMapper.map(rezervace, RezervaceOutputDtoAll.class)).collect(Collectors.toList()));
    }

    @GetMapping("/misto")
    public ResponseEntity dejVsechnyRezervovaneDnyMista(
            @RequestParam(name = "misto") String misto,
            @RequestParam(name = "revir") String revir
    ){
        var result = rezervaceService.findAllReservedDaysByMisto(misto, revir);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity dejRezervaciDleId(@PathVariable Long id) {
        var result = rezervaceService.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException();
        }
        //return ResponseEntity.ok(result);
        return ResponseEntity.ok(modelMapper.map(result.get(), RezervaceOutputDtoAll.class));
    }

    @DeleteMapping("/user/{id}")
    void smazRezervaciUzivatele(@PathVariable(name = "id") Long id, Principal user) {
        Optional<Rezervace> rez = rezervaceService.findById(id);
        if(!rez.get().getUzivatel().getUsername().equals(user.getName())) throw new InvalidParameterException();
        rezervaceService.delete(id);
    }

    @DeleteMapping("/{id}")
    void smazRezervaci(@PathVariable(name = "id") Long id, Principal user) {
        rezervaceService.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity nastavStavPlatby(@RequestBody boolean stav, @PathVariable Long id) {
        Optional<Rezervace> rez = rezervaceService.findById(id);
        if(rez.isPresent()) {
            rez.get().setStavPlatby(stav);
            var result = rezervaceService.update(id, rez.get());
            return ResponseEntity.status(HttpStatus.OK).body(modelMapper.map(result, RezervaceOutputDtoAll.class));
        }else {
            throw new ResourceNotFoundException();
        }

    }
}
