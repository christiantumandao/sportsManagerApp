package com.backend.sportscalendar.appuser;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.backend.sportscalendar.Event;

// handles CRUD operations onto aws' rdb
@Repository
public interface UserRepository extends CrudRepository<AppUser, Integer> {

    // find all
    // findById(id)
    // save(event)
    // deleteById
}
