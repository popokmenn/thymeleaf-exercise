package com.naufal.ThymeleafExercise.service;

import java.util.Date;

import com.naufal.ThymeleafExercise.Repository.BiodataRepository;
import com.naufal.ThymeleafExercise.Repository.UserRepository;
import com.naufal.ThymeleafExercise.model.User;

import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImpl implements UserService {

    @Autowired
    private BiodataRepository biodataRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        user.getBiodata().setCreatedAt(new Date());
        biodataRepository.save(user.getBiodata());
        userRepository.save(user);

        return null;
    }

}