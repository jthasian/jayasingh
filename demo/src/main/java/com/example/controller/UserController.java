package com.example.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.exception.ErrorInfo;
import com.example.model.User;
import com.example.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/v1/api")
@Api(value="userservice", description="user service detail")
public class UserController {
	
	@Autowired
	private UserService userService;
		
	@ApiOperation(value = "View a list of available users",response = Iterable.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved list"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    }
    )
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public List<User> getUsers() {
		return userService.getAllUsers();
	}

	@ApiOperation(value = "Search a user with an ID",response = User.class)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "User's id", required = false, dataType = "string", paramType = "query", defaultValue="1234")
      })
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable("id") String id) {
		System.out.println("^^^^^^^^^^^^^^6 userService "+userService);
		User user = userService.getUserById(id);
		
		System.out.println("^^^^^^^^^^^^^^6 "+user);
		return user;
	}
	
	 /* Create a user */
	@ApiOperation(value = "Create a user",response = User.class)
    @RequestMapping(
            value = "user",
            method = RequestMethod.POST)
    public ResponseEntity<User> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder) {
        if (userService.isUserExist(user)) {
        	return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        userService.saveUser(user);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("user/{id}").buildAndExpand(user.getId()).toUri());
        return new ResponseEntity<>(user, headers, HttpStatus.CREATED);
    }
	
	@RequestMapping("/**")
    public ResponseEntity<ErrorInfo> unmappedRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();
        //throw new UnknownResourceException("There is no resource for path " + uri);
        HttpHeaders headers = new HttpHeaders();
        ErrorInfo errorInfo = new ErrorInfo("There is no resource for path " + uri);
        return new ResponseEntity<>(errorInfo, headers, HttpStatus.BAD_REQUEST);
    }
}