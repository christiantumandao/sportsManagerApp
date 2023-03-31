package com.backend.sportscalendar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://sportseventmanager.s3-website.us-east-2.amazonaws.com/")
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

    // UPDATE event
    @PutMapping(value = "events/watched/{id}")
    public Event updateEventWatched(@PathVariable int id,
            @RequestParam("watched") String watched) {

        Event updatedEvent = null;
        try {
            updatedEvent = eventService.getEvent(id); // get
            updatedEvent.setWatched(watched); // update
            repo.save(updatedEvent); // load back into db
            return updatedEvent;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return updatedEvent;
    }

}
