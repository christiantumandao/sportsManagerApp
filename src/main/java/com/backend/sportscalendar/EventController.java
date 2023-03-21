package com.backend.sportscalendar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EventController {

    @Autowired
    EventRepository repo;

    @Autowired
    EventService eventService;

    // GET all events
    @RequestMapping("/events/all-events")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // GET an event by id
    @RequestMapping("/events/{id}")
    public Event getEvent(@PathVariable int id) throws Exception {
        return eventService.getEvent(id);
    }

    // POST event
    @PostMapping("/events/new-event")
    public Event saveEvent(@RequestBody Event event) {
        eventService.addEvent(event);
        return event;
    }

    // DELETE event
    @DeleteMapping("events/{id}")
    public void deleteEvent(@PathVariable int id) {
        repo.deleteById(id);
    }

}
