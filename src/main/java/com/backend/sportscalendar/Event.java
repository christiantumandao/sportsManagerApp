package com.backend.sportscalendar;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "event")
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    @Id
    @Column(name = "id")
    @GeneratedValue
    private int id;

    @Column(name = "eventName")
    private String eventName;

    @Column(name = "trackedTimes")
    private String trackedTimes;

    @Column(name = "eventDate")
    private String date;

    @Column(name = "home")
    private String home;

    @Column(name = "homeImg")
    private String homeImg;

    @Column(name = "away")
    private String away;

    @Column(name = "awayImg")
    private String awayImg;

    @Column(name = "stadium")
    private String stadium;

    @Column(name = "location")
    private String location;

    @Column(name = "eventTime")
    private String time;

    @Column(name = "uid")
    private int uid;

    @Column(name = "watched")
    private String watched;

    // constructor
    public Event(String name, String trackedTimes,
            String date, String home, String homeImg,
            String away, String awayImg, String stadium,
            String location, String time, int uid, String watched) {
        this.eventName = name;
        this.trackedTimes = trackedTimes;
        this.date = date;
        this.home = home;
        this.homeImg = homeImg;
        this.away = away;
        this.awayImg = awayImg;
        this.stadium = stadium;
        this.location = location;
        this.time = time;
        this.uid = uid;
        this.watched = watched;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEventName() {
        return this.eventName;
    }

    public void setEventName(String name) {
        this.eventName = name;
    }

    public String getTrackedTimes() {
        return this.trackedTimes;
    }

    public void setTrackedTimes(String eventDesc) {
        this.trackedTimes = eventDesc;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getHome() {
        return this.home;
    }

    public void setHome(String home) {
        this.home = home;
    }

    public String getHomeImg() {
        return this.homeImg;
    }

    public void set(String homeImg) {
        this.homeImg = homeImg;
    }

    public String getAway() {
        return this.away;
    }

    public void setAway(String away) {
        this.away = away;
    }

    public String getAwayImg() {
        return this.awayImg;
    }

    public void setAwayImg(String awayImg) {
        this.awayImg = awayImg;
    }

    public String getStadium() {
        return this.stadium;
    }

    public void setStadium(String stadium) {
        this.stadium = stadium;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTime() {
        return this.time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getUID() {
        return this.uid;
    }

    public void setUID(int uid) {
        this.uid = uid;
    }

    public void setWatched(String watched) {
        this.watched = watched;
    }

    public String getWatched() {
        return this.watched;
    }

}
