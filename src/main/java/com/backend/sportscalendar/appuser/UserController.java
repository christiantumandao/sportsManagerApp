package com.backend.sportscalendar.appuser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.sportscalendar.Event;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("/users")
    public List<AppUser> getAllUsers() {
        return userService.getAllUsers();
    }

    // get users by id
    @RequestMapping("/users/{id}")
    public Event getEvent(@PathVariable int id) {
        return userService.getEvent(id);
    }

    // create user
    @PostMapping("/users")
    public AppUser addUser(@RequestBody AppUser user) {
        userService.addUser(user);
        return user;
    }

    //
}
