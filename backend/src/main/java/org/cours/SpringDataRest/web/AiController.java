package org.cours.SpringDataRest.web;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/ai")
public class AiController {

    private final ChatClient chatClient;

    public AiController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @PostMapping("/voiture-conseil")
    public ResponseEntity<Map<String, String>> conseilVoiture(
            @RequestBody Map<String, String> body) {

        System.out.println("=== AI Groq appelé ===");

        String question = body.getOrDefault(
                "question",
                "Donne un conseil pour acheter une voiture."
        );

        System.out.println("Question : " + question);

        String reponse = chatClient.prompt()
                .user("Tu es un expert automobile marocain. " +
                        "Réponds en français en 4-5 lignes. " +
                        question)
                .call()
                .content();

        System.out.println(" Réponse Groq : " + reponse);

        return ResponseEntity.ok(Map.of("reponse", reponse));
    }
}