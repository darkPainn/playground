package com.sedat.playgroundback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sedat.playgroundback.model.Authorities;

public interface AuthoritiesRepository extends JpaRepository<Authorities, Long>  {

}
