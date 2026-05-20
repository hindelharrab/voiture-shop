package org.cours.SpringDataRest;

import org.cours.SpringDataRest.modele.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringDataRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringDataRestApplication.class, args);
	}

	@Bean
	CommandLineRunner initData(VoitureRepo voitureRepo,
	                           ProprietaireRepo proprietaireRepo) {
		return args -> {

			// On vide d'abord pour eviter les doublons
			voitureRepo.deleteAll();
			proprietaireRepo.deleteAll();

			// Creer les proprietaires
			Proprietaire p1 = new Proprietaire("Ali", "Hassan");
			Proprietaire p2 = new Proprietaire("Najat", "Bani");
			proprietaireRepo.save(p1);
			proprietaireRepo.save(p2);

			// Creer les voitures
			voitureRepo.save(new Voiture("Toyota", "Corolla",
					"Grise", "A-1-9090", 2018, 95000));
			voitureRepo.save(new Voiture("Ford", "Fiesta",
					"Rouge", "A-2-8090", 2015, 90000));
			voitureRepo.save(new Voiture("Honda", "CRV",
					"Bleu", "A-3-7090", 2016, 140000));

			System.out.println(" Données initialisées avec succès !");
		};
	}
}