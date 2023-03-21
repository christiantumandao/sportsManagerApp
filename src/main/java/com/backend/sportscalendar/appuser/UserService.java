package com.backend.sportscalendar.appuser;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// gets method calls from controller to handle CRUD operations 
// by calling the UserRepository
@Service
public class UserService {
    // ResponseEntity<?> saveUser(AppUser user);

    @Autowired
    private UserRepository userRepository;

    public void addUser(AppUser user) {
        userRepository.save(user);
    }

    public List<AppUser> getAllUsers() {
        List<AppUser> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public AppUser getUser(int id) {
        return userRepository.findById(id).get();
    }

}
