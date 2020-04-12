package com.naufal.ThymeleafExercise.configuration;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper;
    }

    @Bean
    public FilterRegistrationBean<FilterLoginBean> loggingFilter() {
        FilterRegistrationBean<FilterLoginBean> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new FilterLoginBean());
        registrationBean.addUrlPatterns("//*");
        // registrationBean.addUrlPatterns("/toko/*");
        return registrationBean;
    }
}
