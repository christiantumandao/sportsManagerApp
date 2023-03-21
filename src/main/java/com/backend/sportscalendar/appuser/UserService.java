package com.backend.sportscalendar.appuser;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.backend.sportscalendar.Event;
import com.backend.sportscalendar.EventRepository;

// gets method calls from controller to handle CRUD operations 
// by calling the UserRepository
@Service
public class UserService {
    // ResponseEntity<?> saveUser(AppUser user);

    @Autowired
    private EventRepository eventRepository;

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

    public Event getEvent(int id) {
        return eventRepository.findById(id).get();
    }

    public void addEvent(Event event) {
        eventRepository.save(event);
    }

    public void updateEvent(int id, Event event) {
        eventRepository.save(event);
    }

    public void deleteEvent(int id) {
        eventRepository.deleteById(id);
    }

}
