package com.naufal.ThymeleafExercise.controller.rest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.naufal.ThymeleafExercise.model.HomeDetailModel;
import com.naufal.ThymeleafExercise.model.HomeModel;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeRestController {

	@RequestMapping(value = "/get-all", method = RequestMethod.GET)
	public List<HomeModel> getAllBiodata() {
		String[] hobiArr = new String[4];
		hobiArr[2] = " Menutup pintu";
		hobiArr[3] = " Bermain rental PS";

		HomeModel homeModel = new HomeModel();
		HomeDetailModel detailModel = new HomeDetailModel();
		homeModel.setName("Naufal Popokmen");
		homeModel.setEmail("gmail@naufal.com");
		detailModel.setAlamat("Griya Praweda");
		detailModel.setHobi(hobiArr);
		detailModel.setTanggal(dateFromLocalDate("17/09/2000"));
		homeModel.setDetailModel(detailModel);

		HomeModel homeModel2 = new HomeModel();
		homeModel2.setName("Nopel");
		homeModel2.setEmail("@naufal.com");
		homeModel2.setDetailModel(detailModel);

		List<HomeModel> homeModels = new ArrayList<>();
		homeModels.add(homeModel);
		homeModels.add(homeModel2);

		return homeModels;
	}

	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public HomeModel getBiodata() {
		String[] hobiArr = new String[4];
		hobiArr[0] = " Menutup pintu";
		hobiArr[1] = " Bermain rental PS";

		HomeModel homeModel = new HomeModel();
		HomeDetailModel detailModel = new HomeDetailModel();
		homeModel.setName("Naufal Popokmen");
		homeModel.setEmail("gmail@naufal.com");
		detailModel.setAlamat("Griya Praweda");
		detailModel.setHobi(hobiArr);
		detailModel.setTanggal(dateFromLocalDate("17/09/2000"));
		homeModel.setDetailModel(detailModel);

		return homeModel;
	}

	private Date dateFromLocalDate(String myDate) {
		final String myPattern = "dd/MM/yyyy";
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(myPattern);
		LocalDate localDate = LocalDate.parse(myDate, dateTimeFormatter);

		return java.sql.Date.valueOf(localDate);
	}

}
