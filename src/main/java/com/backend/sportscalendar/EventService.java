package com.backend.sportscalendar;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    public List<Event> getAllEvents() {
        List<Event> users = new ArrayList<>();
        eventRepository.findAll().forEach(users::add);
        return users;
    }

    public Event getEvent(int id) throws Exception {
        Event event = eventRepository.findById(id).orElseThrow(() -> new Exception("Event not found"));
        return event;
    }

    public void addEvent(Event event) {
        eventRepository.save(event);
    }

    public void deleteEvent(int id) {
        eventRepository.deleteById(id);
    }

}
