package com.naufal.ThymeleafExercise.controller.rest;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import com.google.common.base.Optional;
import com.naufal.ThymeleafExercise.Repository.UserRepository;
import com.naufal.ThymeleafExercise.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserRestController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/reg")
    private ResponseEntity<User> saveUser(@RequestBody User user) {
        Date currentDate = new Date();

        user.setCreatedAt(currentDate);
        user.getBiodata().setCreatedAt(currentDate);
        try {
            user.setPassword(encryptPassword(user.getPassword()));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        User userSave = userRepository.save(user);

        if (userSave != null)
            return new ResponseEntity<User>(userSave, HttpStatus.OK);
        else
            return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping(value = "/login")
    private ResponseEntity<Boolean> validateUser(@RequestParam String username, @RequestParam String password,
            HttpServletRequest req) {
        User user = userRepository.findByUsernameAndPassword(username, password);

        if (user != null) {
            req.getSession().setAttribute("username", username);

            if(user.getBiodata().getProfilePhoto() != null) {
                req.getSession().setAttribute("profilephoto", user.getBiodata().getProfilePhoto());
            }

            return ResponseEntity.ok(Boolean.TRUE);
        } else
            return ResponseEntity.ok(Boolean.FALSE);
    }

    private String encryptPassword(String myPassword) throws NoSuchAlgorithmException {

        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(myPassword.getBytes());

        byte[] digest = md.digest();
        String myHash = DatatypeConverter.printHexBinary(digest);

        return myHash;
    }

}