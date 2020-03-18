package com.naufal.ThymeleafExercise.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.naufal.ThymeleafExercise.model.HomeModel;

@Controller
public class HomeController {

	@RequestMapping(value = "/home", method = RequestMethod.POST)
	public String home(@ModelAttribute HomeModel formDataModel, Model model) {
		return "hello-form";
	}
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String form() {
		return "dashboard/index";
	}

}
