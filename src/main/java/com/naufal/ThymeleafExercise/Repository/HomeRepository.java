package com.naufal.ThymeleafExercise.Repository;

import com.naufal.ThymeleafExercise.model.HomeModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeRepository extends JpaRepository<HomeModel, Long> {

}