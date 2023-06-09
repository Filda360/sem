package com.rezervace.sem.controller;

import com.rezervace.sem.dto.AuthenticationRequest;
import com.rezervace.sem.dto.AuthenticationResponse;
import com.rezervace.sem.dto.UzivatelOutputDtoAll;
import com.rezervace.sem.security.CustomUserDetails;
import com.rezervace.sem.security.JWTTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = {"http://localhost:5173/"})
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JWTTokenHelper jWTTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {

        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUserName(), authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomUserDetails user=(CustomUserDetails) authentication.getPrincipal();
        String jwtToken=jWTTokenHelper.generateToken(user.getUsername());

        AuthenticationResponse
                response=new AuthenticationResponse();
        response.setToken(jwtToken);


        return ResponseEntity.ok(response);
    }

    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(Principal user){
        CustomUserDetails userObj=(CustomUserDetails) userDetailsService.loadUserByUsername(user.getName());

        UzivatelOutputDtoAll userInfo=new UzivatelOutputDtoAll();
        userInfo.setId(userObj.getId());
        userInfo.setJmeno(userObj.getJmeno());
        userInfo.setPrijmeni(userObj.getPrijmeni());
        userInfo.setUsername(userObj.getUsername());
        userInfo.setAdresa(userObj.getAdresa());
        userInfo.setTelefon(userObj.getTelefon());
        userInfo.setEmail(userObj.getEmail());
        userInfo.setRole(userObj.getAuthorities().toArray()[0].toString());

        return ResponseEntity.ok(userInfo);
    }
}
