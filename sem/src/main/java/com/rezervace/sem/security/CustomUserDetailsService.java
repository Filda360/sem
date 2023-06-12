package com.rezervace.sem.security;


import com.rezervace.sem.model.Uzivatel;
import com.rezervace.sem.repo.UzivatelRepository;
import com.rezervace.sem.service.UzivatelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UzivatelRepository uzivatelRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Uzivatel uzivatel = uzivatelRepo.findByUsername(username);
        if(uzivatel==null){
            throw new UsernameNotFoundException("User not found !");
        }
        return new CustomUserDetails(uzivatel);
    }
}
