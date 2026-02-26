import { Injectable } from '@angular/core';
import { ReadBoutique } from '../../models/anthony/ABoutique';

@Injectable({
  providedIn: 'root',
})
export class BoutiqueRecentesService {
  private readonly STORAGE_KEY = 'boutiques_recentes';
  private readonly MAX_BOUTIQUES = 3; // Nombre max de boutiques à stocker

  constructor() {}

  ajouterBoutiqueRecente(boutique: ReadBoutique): void {
    let recentes = this.getBoutiquesRecentes();
    
    // Vérifier si la boutique existe déjà
    const index = recentes.findIndex(b => b._id === boutique._id);
    if (index !== -1) {
      // Supprimer l'ancienne entrée pour la remettre en tête
      recentes.splice(index, 1);
    }
    
    // Ajouter la nouvelle boutique au début
    recentes.unshift(boutique);
    
    // Limiter le nombre de boutiques
    if (recentes.length > this.MAX_BOUTIQUES) {
      recentes = recentes.slice(0, this.MAX_BOUTIQUES);
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recentes));
  }

  // Récupérer les boutiques récentes
  getBoutiquesRecentes(): ReadBoutique[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Effacer l'historique
  effacerHistorique(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
