package com.naufal.ThymeleafExercise.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity(name = User.TABLE_NAME)
public class User extends BaseEntity {

    public static final String TABLE_NAME = "T_USER";

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "user_username")
    private String username;

    @Column(name = "user_password")
    private String password;

    @Column(name = "user_email")
    private String email;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumns({
        @JoinColumn(name="BIO_ID", referencedColumnName="id"),
        @JoinColumn(name="BIO_FULLNAME", referencedColumnName="bio_fullname")
    })
    private Biodata biodata;

}