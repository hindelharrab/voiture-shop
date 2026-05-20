package org.cours.SpringDataRest.web;

import org.cours.SpringDataRest.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {   // ← Pas de @CrossOrigin ici, géré par SecurityConfig

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public AuthController(AuthenticationManager authManager,
                          JwtUtil jwtUtil,
                          UserDetailsService userDetailsService) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        System.out.println("=== LOGIN : " + creds.get("username") + " ===");
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.get("username"),
                            creds.get("password")
                    )
            );
        } catch (BadCredentialsException e) {
            System.out.println("❌ Mauvais identifiants");
            return ResponseEntity.status(401)
                    .body(Map.of("erreur", "Identifiants incorrects"));
        }
        String token = jwtUtil.generateToken(creds.get("username"));
        System.out.println("✅ Token généré avec succès");
        return ResponseEntity.ok(Map.of("token", token));
    }
}