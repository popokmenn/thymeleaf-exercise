package com.naufal.ThymeleafExercise.model;

import java.util.Date;

import javax.persistence.MappedSuperclass;

import lombok.Data;

@MappedSuperclass
@Data
public class BaseEntity {

    private Date createdAt;

    private Date updatedAt;

    private String createdBy;

    private String updatedBy;

}