package com.backend.sportscalendar.appuser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.backend.sportscalendar.Event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_table")
@AllArgsConstructor
@NoArgsConstructor
public class AppUser {

    @Id
    @Column(name = "id")
    @GeneratedValue
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    public AppUser(
            String username,
            String password,
            String firstName,
            String lastName) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
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
