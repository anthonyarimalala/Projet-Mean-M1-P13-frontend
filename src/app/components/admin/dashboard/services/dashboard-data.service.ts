import { Injectable } from '@angular/core';
import {
  TestBoutique,
  TestUtilisateur,
  TestAnnonce,
  TestDashboardStats,
  TestStatistiquesBoutiques,
  TestStatistiquesUtilisateurs,
  TestStatistiquesAnnonces
} from '../models/test-models';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  private data: TestDashboardStats;

  constructor() {
    this.data = {
      boutiques: this.generateBoutiques(),
      utilisateurs: this.generateUtilisateurs(),
      annonces: this.generateAnnonces()
    };
  }

  private generateBoutiques(): TestBoutique[] {
    return [
      { id: 1, nom: 'Boutique Sport', statut: 'disponible', dateCreation: new Date('2024-01-15'), proprietaireId: 2 },
      { id: 2, nom: 'Boutique Mode', statut: 'validee', dateCreation: new Date('2024-01-20'), proprietaireId: 3 },
      { id: 3, nom: 'Boutique Tech', statut: 'en-attente', dateCreation: new Date('2024-02-01'), proprietaireId: 4 },
      { id: 4, nom: 'Boutique Maison', statut: 'non-disponible', dateCreation: new Date('2024-02-10'), proprietaireId: 5 },
      { id: 5, nom: 'Boutique Livres', statut: 'disponible', dateCreation: new Date('2024-02-15'), proprietaireId: 6 },
      { id: 6, nom: 'Boutique Jouets', statut: 'validee', dateCreation: new Date('2024-02-20'), proprietaireId: 7 },
      { id: 7, nom: 'Boutique Beauté', statut: 'en-attente', dateCreation: new Date('2024-03-01'), proprietaireId: 8 },
      { id: 8, nom: 'Boutique Auto', statut: 'disponible', dateCreation: new Date('2024-03-05'), proprietaireId: 9 }
    ];
  }

  private generateUtilisateurs(): TestUtilisateur[] {
    return [
      { id: 1, nom: 'Admin Principal', email: 'admin@test.com', role: 'ADMIN', dateInscription: new Date('2024-01-01') },
      { id: 2, nom: 'Jean Dupont', email: 'jean@boutique.com', role: 'BOUTIQUE', dateInscription: new Date('2024-01-15'), boutiqueId: 1 },
      { id: 3, nom: 'Marie Martin', email: 'marie@mode.com', role: 'BOUTIQUE', dateInscription: new Date('2024-01-20'), boutiqueId: 2 },
      { id: 4, nom: 'Pierre Durant', email: 'pierre@tech.com', role: 'BOUTIQUE', dateInscription: new Date('2024-02-01'), boutiqueId: 3 },
      { id: 5, nom: 'Sophie Petit', email: 'sophie@maison.com', role: 'BOUTIQUE', dateInscription: new Date('2024-02-10'), boutiqueId: 4 },
      { id: 6, nom: 'Luc Bernard', email: 'luc@livres.com', role: 'BOUTIQUE', dateInscription: new Date('2024-02-15'), boutiqueId: 5 },
      { id: 7, nom: 'Emma Robert', email: 'emma@jouets.com', role: 'BOUTIQUE', dateInscription: new Date('2024-02-20'), boutiqueId: 6 },
      { id: 8, nom: 'Thomas Leroy', email: 'thomas@beaute.com', role: 'BOUTIQUE', dateInscription: new Date('2024-03-01'), boutiqueId: 7 },
      { id: 9, nom: 'Julie Moreau', email: 'julie@auto.com', role: 'BOUTIQUE', dateInscription: new Date('2024-03-05'), boutiqueId: 8 },
      { id: 10, nom: 'Paul Durand', email: 'paul@email.com', role: 'ACHETEUR', dateInscription: new Date('2024-03-10') },
      { id: 11, nom: 'Claire Lefebvre', email: 'claire@email.com', role: 'ACHETEUR', dateInscription: new Date('2024-03-12') },
      { id: 12, nom: 'Nicolas Petit', email: 'nicolas@email.com', role: 'ACHETEUR', dateInscription: new Date('2024-03-15') },
      { id: 13, nom: 'Sarah Dubois', email: 'sarah@email.com', role: 'ACHETEUR', dateInscription: new Date('2024-03-18') },
      { id: 14, nom: 'Antoine Roux', email: 'antoine@email.com', role: 'ACHETEUR', dateInscription: new Date('2024-03-20') }
    ];
  }

  private generateAnnonces(): TestAnnonce[] {
    const annonces: TestAnnonce[] = [];
    const dates = [
      '2024-03-01', '2024-03-01', '2024-03-02', '2024-03-02', '2024-03-02',
      '2024-03-03', '2024-03-03', '2024-03-04', '2024-03-04', '2024-03-04',
      '2024-03-04', '2024-03-05', '2024-03-05', '2024-03-06', '2024-03-06',
      '2024-03-07', '2024-03-08', '2024-03-08', '2024-03-09', '2024-03-10'
    ];

    dates.forEach((date, index) => {
      annonces.push({
        id: index + 1,
        titre: `Annonce ${index + 1}`,
        description: `Description de l'annonce ${index + 1}`,
        boutiqueId: Math.floor(Math.random() * 8) + 1,
        datePublication: new Date(date),
        statut: 'active',
        prix: Math.floor(Math.random() * 1000) + 50
      });
    });

    return annonces;
  }

  getStatistiquesBoutiques(): TestStatistiquesBoutiques {
    const boutiques = this.data.boutiques;
    return {
      total: boutiques.length,
      disponibles: boutiques.filter(b => b.statut === 'disponible').length,
      nonDisponibles: boutiques.filter(b => b.statut === 'non-disponible').length,
      enAttente: boutiques.filter(b => b.statut === 'en-attente').length,
      validees: boutiques.filter(b => b.statut === 'validee').length
    };
  }

  getStatistiquesUtilisateurs(): TestStatistiquesUtilisateurs {
    const utilisateurs = this.data.utilisateurs;
    const derniersInscrits = [...utilisateurs]
      .sort((a, b) => b.dateInscription.getTime() - a.dateInscription.getTime())
      .slice(0, 5);

    return {
      total: utilisateurs.length,
      boutiques: utilisateurs.filter(u => u.role === 'BOUTIQUE').length,
      acheteurs: utilisateurs.filter(u => u.role === 'ACHETEUR').length,
      derniersInscrits
    };
  }

  getStatistiquesAnnonces(): TestStatistiquesAnnonces {
    const annonces = this.data.annonces;
    const annoncesParDate = new Map<string, number>();

    annonces.forEach(annonce => {
      const dateStr = annonce.datePublication.toISOString().split('T')[0];
      annoncesParDate.set(dateStr, (annoncesParDate.get(dateStr) || 0) + 1);
    });

    const parDate = Array.from(annoncesParDate.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 7);

    return {
      total: annonces.length,
      parDate
    };
  }
}
