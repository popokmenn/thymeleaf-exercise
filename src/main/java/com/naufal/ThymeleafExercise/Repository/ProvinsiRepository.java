package com.naufal.ThymeleafExercise.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.naufal.ThymeleafExercise.model.Provinsi;

@Repository
public interface ProvinsiRepository extends JpaRepository<Provinsi, Long> {

}
