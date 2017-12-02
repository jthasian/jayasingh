package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.User;
import com.example.repository.UserRepository;

@Service("userService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository; 

	@Override
	public User getUserById(String id) {
		return userRepository.findOne(id);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public void saveUser(User user) {
        User existing = userRepository.findOne(user.getId());
//        if (existing != null) {
//        }
        userRepository.save(user);
	}

	@Override
	public boolean isUserExist(User user) {
		return userRepository.findOne(user.getId()) != null;
	}

	@Override
	public User getUserByEmail(String email) {
		// TODO Auto-generated method stub
		System.out.println("^^^^^^^^^^^^^^6 userRepository "+userRepository);
		return userRepository.findByEmail(email);
	}

}