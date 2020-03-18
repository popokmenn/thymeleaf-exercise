package com.naufal.ThymeleafExercise.model;

public class HomeModel {

	private String name;
	private String email;
	private HomeDetailModel detailModel;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public HomeDetailModel getDetailModel() {
		return detailModel;
	}

	public void setDetailModel(HomeDetailModel detailModel) {
		this.detailModel = detailModel;
	}

}
