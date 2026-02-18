import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-boutique-forms',
  standalone: true,   
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './boutique-forms.component.html',
  styleUrls: ['./boutique-forms.component.css']
})
export class BoutiqueFormComponent {

  boutiqueForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.boutiqueForm = this.fb.group({
      _id: ['BOUT_108', Validators.required], // <- ici tu fournis l'ID manuellement
      numero: ['A12', Validators.required],
      etage: [1, Validators.required],
      is_disponible: [true],
      prix: [150000, Validators.required],
      promotion: this.fb.group({
        active: [true],
        taux: [10]
      }),
      nom_boutique: ['Tech World', Validators.required],
      lien_site_web: ['https://tech-world.com'],
      locataire_id: ['USR_045', Validators.required],
      date_prochain_paiement: ['2026-03-01'],
      categories: [['CAT_01', 'CAT_03']], // tableau
      is_deleted: [false] 
    });
  }
  

  onSubmit() {
    //alert('"tafiditra')
    if (this.boutiqueForm.invalid) {
      console.error('❌ Formulaire invalide');
      return;
    }
  
    // Affiche les valeurs brutes du formulaire
    console.log('Valeurs du formulaire :', this.boutiqueForm.value);
  
    // Copie et formate les données
    const formData = { ...this.boutiqueForm.value };
  
    // S'assure que categories est un tableau
    if (typeof formData.categories === 'string') {
      formData.categories = formData.categories.split(',').map((c: string) => c.trim());
    }
  
    // Vérifie la date (Express aime ISOString)
    if (formData.date_prochain_paiement) {
      formData.date_prochain_paiement = new Date(formData.date_prochain_paiement).toISOString();
    }
  
    console.log('Envoi au serveur :', formData);
  
    this.authService.sendBoutique(formData)?.subscribe({
      next: (res) => console.log('✅ Réponse du serveur :', res),
      error: (err) => console.error('❌ Erreur serveur :', err)
    });
  }
  
  
}

