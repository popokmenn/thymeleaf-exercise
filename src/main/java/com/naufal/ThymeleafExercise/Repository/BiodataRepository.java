package com.naufal.ThymeleafExercise.Repository;

import com.naufal.ThymeleafExercise.model.Biodata;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BiodataRepository extends JpaRepository<Biodata, Long> {

}