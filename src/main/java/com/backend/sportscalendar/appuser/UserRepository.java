package com.backend.sportscalendar.appuser;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// handles CRUD operations onto aws' rdb
@Repository
public interface UserRepository extends CrudRepository<AppUser, Integer> {

    // find all
    // findById(id)
    // save(event)
    // deleteById
}
