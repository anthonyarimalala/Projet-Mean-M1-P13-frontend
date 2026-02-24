import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateBoutique } from '../../../../models/anthony/ABoutique';
import { AboutiqueService } from '../../../../services/anthony/aboutique.service';

@Component({
  selector: 'app-nouvelle-boutique',
  imports: [ReactiveFormsModule, CommonModule], // Ajout de CommonModule pour *ngIf
  templateUrl: './nouvelle-boutique.component.html',
  styleUrls: [
    './nouvelle-boutique.component.css',
    '../../../templates/pages/admin-boutique-inputs.component/admin-boutique-inputs.component.css',
  ],
})
export class NouvelleBoutiqueComponent {
  createForm: FormGroup;
  selectedCategories: string[] = [];

  // États pour le feedback utilisateur
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private aboutiqueService: AboutiqueService) {
    this.createForm = this.fb.group({
      numero: ['', Validators.required],
      etage: [null, [Validators.required, Validators.min(0)]],
      is_disponible: [true],
      prix: [890000, [Validators.min(0)]],
      promotionActive: [true],
      promotionTaux: [10, [Validators.min(0), Validators.max(100)]],
      nom_boutique: ['Tech World'],
      lien_site_web: [''],
      locataire_id: [''],
      date_prochain_paiement: [''],
    });
  }

  ngOnInit(): void {
    this.selectedCategories = [];
  }

  // Fonction pour effacer les messages après un délai
  clearMessages(): void {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 5000); // Les messages disparaissent après 5 secondes
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.createForm.reset({
      numero: '',
      etage: null,
      is_disponible: true,
      prix: 890000,
      promotionActive: true,
      promotionTaux: 10,
      nom_boutique: 'Tech World',
      lien_site_web: '',
      locataire_id: '',
      date_prochain_paiement: '',
    });
    this.selectedCategories = [];
  }

  create(data: CreateBoutique): void {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.aboutiqueService.createBoutique(data).subscribe({
      next: (response) => {
        console.log('Boutique créée avec succès:', response);
        this.isLoading = false;
        this.successMessage = 'Boutique créée avec succès !';

        // Réinitialiser le formulaire mais rester sur la page
        this.resetForm();

        // Effacer le message après 5 secondes
        this.clearMessages();
      },
      error: (error) => {
        console.error('Erreur lors de la création:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Une erreur est survenue lors de la création de la boutique.';
        this.clearMessages();
      },
      complete: () => {
        console.log('Création terminée');
        // Le loading est déjà désactivé dans next/error
      }
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const formData = this.createForm.value;

      // Construire l'objet selon le format demandé
      const boutiqueData = {
        numero: formData.numero,
        etage: formData.etage,
        is_disponible: formData.is_disponible,
        prix: formData.prix,
        promotion: {
          active: formData.promotionActive,
          taux: formData.promotionTaux,
        },
        nom_boutique: formData.nom_boutique,
        // Ajouter les catégories si nécessaire
        categories: this.selectedCategories,
      };

      // Appeler la fonction create
      this.create(boutiqueData);

      // Afficher les données dans la console pour vérification
      console.log('Données formatées:', JSON.stringify(boutiqueData, null, 2));
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.createForm.controls).forEach((key) => {
        this.createForm.get(key)?.markAsTouched();
      });

      this.errorMessage = 'Veuillez remplir tous les champs obligatoires correctement.';
      this.clearMessages();
    }
  }

  onCancel(): void {
    this.router.navigate(['/']); // ou la route de votre choix
  }

  toggleCategory(categoryId: string): void {
    const index = this.selectedCategories.indexOf(categoryId);
    if (index === -1) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  isCategorySelected(categoryId: string): boolean {
    return this.selectedCategories.includes(categoryId);
  }
}
