package com.naufal.ThymeleafExercise.model;

import java.util.Date;

public class HomeDetailModel {

	private String alamat;

	private String[] hobi;

	private Date tanggal;

	public String getAlamat() {
		return alamat;
	}

	public void setAlamat(String alamat) {
		this.alamat = alamat;
	}

	public String[] getHobi() {
		return hobi;
	}

	public void setHobi(String[] hobi) {
		this.hobi = hobi;
	}

	public Date getTanggal() {
		return tanggal;
	}

	public void setTanggal(Date tanggal) {
		this.tanggal = tanggal;
	}

	/*
	 * public HomeDetailModel(String alamat, String hobi) { super(); this.alamat =
	 * alamat; this.hobi = hobi; }
	 */

}
