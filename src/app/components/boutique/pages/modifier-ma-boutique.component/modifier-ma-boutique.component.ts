import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface Category {
  code: string;
  label: string;
}

interface ShopData {
  nom_boutique: string;
  lien_site_web: string;
  categories: string[];
  description: string;
  email: string;
}

@Component({
  selector: 'app-modifier-ma-boutique.component',
  imports: [FormsModule],
  templateUrl: './modifier-ma-boutique.component.html',
  styleUrls: [
    './modifier-ma-boutique.component.css',
    '../../../templates/pages/admin-boutique-inputs.component/admin-boutique-inputs.component.css',
  ],
})
export class ModifierMaBoutiqueComponent {
  // Données de la boutique
  shopData: ShopData = {
    nom_boutique: 'Fashion World',
    lien_site_web: 'https://fashion-world.com',
    categories: ['CAT_02', 'CAT_03'],
    description: 'Boutique de vêtements tendance pour hommes et femmes',
    email: 'contact@fashion-world.com'
  };

  // Liste des catégories disponibles
  availableCategories: Category[] = [
    { code: 'CAT_01', label: 'Vêtements hommes' },
    { code: 'CAT_02', label: 'Vêtements femmes' },
    { code: 'CAT_03', label: 'Accessoires' },
    { code: 'CAT_04', label: 'Chaussures' },
    { code: 'CAT_05', label: 'Sports & Loisirs' },
    { code: 'CAT_06', label: 'Enfants' }
  ];

  // État du composant
  selectedCategories: string[] = [];
  showSuccessMessage = false;

  ngOnInit(): void {
    // Initialiser les catégories sélectionnées
    this.selectedCategories = [...this.shopData.categories];
  }

  // Vérifie si une catégorie est sélectionnée
  isCategorySelected(categoryCode: string): boolean {
    return this.selectedCategories.includes(categoryCode);
  }

  // Vérifie si toutes les catégories sont sélectionnées
  areAllCategoriesSelected(): boolean {
    return this.selectedCategories.length === this.availableCategories.length;
  }

  // Gère le changement d'une catégorie
  onCategoryChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const categoryCode = checkbox.value;

    if (checkbox.checked) {
      this.selectedCategories = [...this.selectedCategories, categoryCode];
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== categoryCode);
    }

    this.shopData.categories = [...this.selectedCategories];
  }

  // Sélectionne/désélectionne toutes les catégories
  toggleAllCategories(event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.selectedCategories = this.availableCategories.map(cat => cat.code);
    } else {
      this.selectedCategories = [];
    }

    this.shopData.categories = [...this.selectedCategories];
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.selectedCategories.length === 0) {
      return;
    }

    // Simulation d'appel API
    console.log('Données sauvegardées :', {
      ...this.shopData,
      categories: this.selectedCategories
    });

    // Afficher le message de succès
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }
}
