package com.backend.sportscalendar.appuser;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.sportscalendar.Event;
import com.backend.sportscalendar.EventService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://sportseventmanager.s3-website.us-east-2.amazonaws.com/")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    EventService eventService;

    @RequestMapping("/users/all-users")
    public List<AppUser> getAllUsers() {
        return userService.getAllUsers();
    }

    // get users by id
    @RequestMapping("/users/{id}")
    public AppUser getEvent(@PathVariable int id) {
        return userService.getUser(id);
    }

    // create user
    @PostMapping("/users")
    public AppUser addUser(@RequestBody AppUser user) {
        userService.addUser(user);
        return user;
    }

    // retrives all events that is under user
    @RequestMapping("/users/events/{uid}")
    public List<Event> getUserEvents(@PathVariable int uid) {

        // retrieves all events and filters only events for certain user
        List<Event> events = eventService.getAllEvents();
        List<Event> userEvents = events.stream().filter(event -> event.getUID() == uid).collect(Collectors.toList());

        return userEvents;
    }

    //
}
