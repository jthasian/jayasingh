package com.example.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private String id;
	private String name;
	private String lastName;
	private boolean active;
	
	public User() {
		super();
	}

	public User(String name, String lastName, boolean active) {
		super();
		this.name = name;
		this.lastName = lastName;
		this.active = active;
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
	
}