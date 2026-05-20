package org.cours.SpringDataRest.modele;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VoitureRepo extends CrudRepository<Voiture, Long> {
    List<Voiture> findByMarque(String marque);
    List<Voiture> findByCouleur(String couleur);
}