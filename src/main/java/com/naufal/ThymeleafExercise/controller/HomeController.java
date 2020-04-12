package com.naufal.ThymeleafExercise.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		return "login";
	}

	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String register() {
		return "register";
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String form() {
		return "dashboard/index";
	}

	@GetMapping("/logout")
	public String logout(HttpServletRequest req){
		req.getSession().removeAttribute("username");
		req.getSession().removeAttribute("profilephoto");
		return "login";
	}

}
