package com.naufal.ThymeleafExercise.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.naufal.ThymeleafExercise.model.Kota;

@Repository
public interface KotaRepository extends JpaRepository<Kota, Long> {

	List<Kota> findByIdProvinsi(Long idProvinsi);

}