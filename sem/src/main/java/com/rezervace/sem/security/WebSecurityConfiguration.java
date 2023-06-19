package com.rezervace.sem.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userService;

    @Autowired
    private JWTTokenHelper jwtTokenHelper;

    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("david").password(passwordEncoder().encode("david")).authorities("USER", "ADMIN");

        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint).and()
                .authorizeRequests((request) -> request.antMatchers("/login/**", "/registration").permitAll()
                        .antMatchers(HttpMethod.GET, "/reviry").permitAll()
                        .antMatchers(HttpMethod.GET, "/mista").permitAll()
                        //.antMatchers(HttpMethod.GET, "/uzivatele").permitAll()
                        .antMatchers(HttpMethod.GET, "/rezervace/user").hasAnyAuthority("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/rezervace/misto").hasAnyAuthority("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/rezervace").hasAnyAuthority("USER", "ADMIN")

                        .antMatchers(HttpMethod.PUT, "/uzivatele").hasAnyAuthority("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/uzivatele").permitAll()

                        .antMatchers(HttpMethod.DELETE, "/rezervace/user/**").hasAnyAuthority("USER", "ADMIN")

                        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll().anyRequest().hasAuthority("ADMIN"))
                .addFilterBefore(new JWTAuthenticationFilter(userService, jwtTokenHelper),
                        UsernamePasswordAuthenticationFilter.class);

        http.csrf().disable().cors().and().headers().frameOptions().disable();
    }
}
