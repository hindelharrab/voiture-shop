package org.cours.SpringDataRest.web;

import org.cours.SpringDataRest.modele.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
public class VoitureController {   // ← Pas de @CrossOrigin ici non plus

    private final VoitureRepo voitureRepo;

    public VoitureController(VoitureRepo voitureRepo) {
        this.voitureRepo = voitureRepo;
    }

    @GetMapping("/voitures")
    public Iterable<Voiture> getAll() {
        return voitureRepo.findAll();
    }

    @GetMapping("/voitures/{id}")
    public ResponseEntity<Voiture> getOne(@PathVariable Long id) {
        Optional<Voiture> v = voitureRepo.findById(id);
        return v.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/voitures")
    public Voiture add(@RequestBody Voiture voiture) {
        return voitureRepo.save(voiture);
    }

    @PutMapping("/voitures/{id}")
    public ResponseEntity<Voiture> update(@PathVariable Long id,
                                          @RequestBody Voiture details) {
        return voitureRepo.findById(id).map(v -> {
            v.setMarque(details.getMarque());
            v.setModele(details.getModele());
            v.setCouleur(details.getCouleur());
            v.setImmatricule(details.getImmatricule());
            v.setAnnee(details.getAnnee());
            v.setPrix(details.getPrix());
            return ResponseEntity.ok(voitureRepo.save(v));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/voitures/{id}")
    public ResponseEntity<Voiture> delete(@PathVariable Long id) {
        return voitureRepo.findById(id).map(v -> {
            voitureRepo.delete(v);
            return ResponseEntity.ok(v);
        }).orElse(ResponseEntity.notFound().build());
    }
}