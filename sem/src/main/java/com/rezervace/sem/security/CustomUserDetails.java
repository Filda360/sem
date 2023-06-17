package com.rezervace.sem.security;

import com.rezervace.sem.model.Uzivatel;
import net.bytebuddy.implementation.bind.annotation.Super;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
    private Uzivatel uzivatel;

    public CustomUserDetails(Uzivatel uzivatel) {
        super();
        this.uzivatel = uzivatel;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(uzivatel.getRole()));
    }

    @Override
    public String getPassword() {
        return uzivatel.getPassword();
    }

    @Override
    public String getUsername() {
        return uzivatel.getUsername();
    }

    public String getJmeno(){ return uzivatel.getJmeno();}

    public String getPrijmeni(){return uzivatel.getPrijmeni();}

    public String getAdresa(){return uzivatel.getAdresa();}

    public String getTelefon(){return uzivatel.getTelefon();}

    public String getEmail(){return uzivatel.getEmail();}

    public Long getId(){return uzivatel.getId();}

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
