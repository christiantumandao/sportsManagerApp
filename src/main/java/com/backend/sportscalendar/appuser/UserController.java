package com.backend.sportscalendar.appuser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.sportscalendar.Event;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("/users")
    public List<Event> getAllTopics() {
        return userService.getAllEvents();
    }

    // get users by id
    @RequestMapping("/users/{id}")
    public Event getEvent(@PathVariable int id) {
        return userService.getEvent(id);
    }

    //
}
