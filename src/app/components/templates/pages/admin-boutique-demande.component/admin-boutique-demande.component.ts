import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { DemandeLocationService } from '../../../../services/location/demande-location.service';

@Component({
  selector: 'app-admin-boutique-demande',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-boutique-demande.component.html',
  styleUrl: './admin-boutique-demande.component.css'
})
export class AdminBoutiqueDemandeComponent {
  @Input() boutiqueId!: string;
  @Input() boutiqueNumero!: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();
  @Output() error = new EventEmitter<string>();

  isSubmitting = signal(false);

  formData = {
    nomBoutique: '',
    categories: '',
    siteWeb: '',
    message: '',
  };

  constructor(
    private demandeLocationService: DemandeLocationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  onCancel() {
    if (this.formModified()) {
      if (confirm('Voulez-vous vraiment annuler ? Les informations saisies seront perdues.')) {
        this.resetForm();
        this.cancel.emit();
      }
    } else {
      this.resetForm();
      this.cancel.emit();
    }
  }

  onSubmit() {
    // Vérification des champs obligatoires
    if (!this.formData.nomBoutique.trim()) {
      alert('Veuillez saisir le nom de la boutique');
      return;
    }

    if (!this.formData.categories.trim()) {
      alert('Veuillez saisir au moins une catégorie');
      return;
    }

    // Confirmation avant envoi
    if (!confirm('Confirmez-vous l\'envoi de cette demande de location ?')) {
      return;
    }

    this.isSubmitting.set(true);

    // const user = this.authService.getCurrentUser();
    const user = {
      'id': this.authService.getId(),
      'nom': this.authService.getNom(),
    };
    if (!user || !user.id) {
      alert('Vous devez être connecté pour faire une demande');
      this.isSubmitting.set(false);
      this.error.emit("Utilisateur non connecté");
      return;
    }

    // Préparation des données
    const demandeData = {
      boutiqueId: this.boutiqueId,
      nomBoutique: this.formData.nomBoutique.trim(),
      categories: this.formData.categories.trim(),
      siteWeb: this.formData.siteWeb?.trim() || undefined,
      message: this.formData.message?.trim() || undefined,
      demandeur: {
        user_id: user.id,
        nom: user.nom || 'Utilisateur',
      }
    };

    // Appel au service
    this.demandeLocationService.createDemande(demandeData).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        alert('✅ Demande envoyée avec succès !');
        this.success.emit();
        this.resetForm();
        this.cancel.emit(); // Ferme le dropdown
      },
      error: (err) => {
        this.isSubmitting.set(false);
        const message = err.error?.message || "Erreur lors de l'envoi de la demande";
        alert(`❌ ${message}`);
        this.error.emit(message);
      }
    });
  }

  // Vérifie si le formulaire a été modifié
  formModified(): boolean {
    return this.formData.nomBoutique.trim() !== '' || 
           this.formData.categories.trim() !== '' || 
           this.formData.siteWeb?.trim() !== '' || 
           this.formData.message?.trim() !== '';
  }

  resetForm() {
    this.formData = {
      nomBoutique: '',
      categories: '',
      siteWeb: '',
      message: '',
    };
  }
}