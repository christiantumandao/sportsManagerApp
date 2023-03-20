package com.backend.sportscalendar.appuser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.backend.sportscalendar.Event;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class AppUser {

    @Id
    @GeneratedValue
    private int id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private boolean isEnabled;

    @Autowired
    private List<Event> events;

    public AppUser(
            String username,
            String password,
            String firstName,
            String lastName) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String newName) {
        this.username = newName;
    }

    private String getPassword() {
        return "cannot return user password";
    }

    public void setPassword(String pw) {
        this.password = pw;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String fN) {
        this.firstName = fN;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lN) {
        this.lastName = lN;
    }

}
