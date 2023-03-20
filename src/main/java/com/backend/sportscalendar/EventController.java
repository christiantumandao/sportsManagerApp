package com.backend.sportscalendar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EventController {

    @Autowired
    EventRepository repo;

    @RequestMapping("/all-events")
    public List<Event> getEvents() {
        return repo.findAll();
    }

    // get an event with specific id
    @RequestMapping("/{id}")
    public Event getEvent(@PathVariable int id) throws Exception {
        Event event = repo.findById(id).orElseThrow(() -> new Exception("Event not found"));
        return event;
    }

    @PostMapping("/events")
    public Event saveEvent(@RequestBody Event event) {
        return repo.save(event);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable int id) {
        repo.deleteById(id);
    }

}
