package com.example.service;

import java.util.List;

import com.example.model.User;

public interface UserService {
	User getUserById(String id);
	List<User> getAllUsers();
	void saveUser(User user);
	boolean isUserExist(User user);
}
