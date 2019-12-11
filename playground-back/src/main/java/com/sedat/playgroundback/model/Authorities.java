package com.sedat.playgroundback.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Authorities {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String authority;
	
//	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH,CascadeType.REFRESH, CascadeType.MERGE })	 
//	@JoinTable(name="users_authorities",joinColumns=@JoinColumn(name="authority_id"),inverseJoinColumns=@JoinColumn(name="user_id"))	
//	@JsonIgnore 
//	private List<Users> users;
	
	
	public Authorities() {
		
	}

	public Authorities(String authority) {
		this.authority = authority;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	@Override
	public String toString() {
		return "Authorities [id=" + id + ", authority=" + authority +  "]";
	}	

}
