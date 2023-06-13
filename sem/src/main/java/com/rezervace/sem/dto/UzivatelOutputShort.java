package com.rezervace.sem.dto;

public class UzivatelOutputShort {
    private String jmeno;
    private String prijmeni;
    private String username;
    private Object role;

    public String getJmeno() {
        return jmeno;
    }

    public String getPrijmeni() {
        return prijmeni;
    }

    public String getUsername() {
        return username;
    }

    public Object getRole() {
        return role;
    }

    public void setJmeno(String jmeno) {
        this.jmeno = jmeno;
    }

    public void setPrijmeni(String prijmeni) {
        this.prijmeni = prijmeni;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRole(Object role) {
        this.role = role;
    }
}
