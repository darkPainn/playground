package com.sedat.playgroundback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.sedat.playgroundback.model.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
	
	@Transactional
	@Query("select u from Users u where u.username = :username and u.password = :password")
	public Users authenticateUser(@Param("username") String username, @Param("password") String password);

}
