package com.example.service;

import java.util.List;

import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;

import com.example.model.User;

public interface UserService {
	User getUserById(String id);
	User getUserByEmail(String email);
	List<User> getAllUsers();
	void saveUser(User user);
	boolean isUserExist(User user);
	List<User> findByAddressLocationNear(Point point, Distance distance);
	List<User> findByNameAndAddressLocationNear(String type, Point point, Distance distance);
}
