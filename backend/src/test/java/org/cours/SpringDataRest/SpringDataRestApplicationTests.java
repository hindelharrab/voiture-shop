package org.cours.SpringDataRest;

import org.cours.SpringDataRest.modele.Voiture;
import org.cours.SpringDataRest.modele.VoitureRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
class SpringDataRestApplicationTests {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private VoitureRepo voitureRepo;

	@Test
	public void ajouterVoiture() {
		Voiture v = new Voiture(
				"MiolaCar",
				"Uber",
				"Blanche",
				"M-2020",
				2021,
				180000
		);

		entityManager.persistAndFlush(v);

		assertThat(v.getId()).isNotNull();
	}

	@Test
	public void supprimerVoiture() {
		entityManager.persistAndFlush(
				new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000)
		);

		entityManager.persistAndFlush(
				new Voiture("MiniCooper", "Uber", "Rouge", "C-2020", 2021, 180000)
		);

		voitureRepo.deleteAll();

		assertThat(voitureRepo.findAll()).isEmpty();
	}

	@Test
	public void rechercherParCouleur() {
		entityManager.persistAndFlush(
				new Voiture("Toyota", "Corolla", "Rouge", "R-111", 2020, 80000)
		);

		entityManager.persistAndFlush(
				new Voiture("Honda", "CRV", "Bleu", "B-222", 2019, 90000)
		);

		assertThat(voitureRepo.findByCouleur("Rouge")).hasSize(1);
	}

}
