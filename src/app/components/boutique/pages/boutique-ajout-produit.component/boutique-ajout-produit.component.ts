import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProduitService } from '../../../../services/produit/produit.service'; // <-- importer le service

@Component({
  selector: 'app-boutique-ajout-produit.component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boutique-ajout-produit.component.html',
  styleUrls: ['./boutique-ajout-produit.component.css'],
})
export class BoutiqueAjoutProduitComponent implements OnInit {

  boutiqueId!: string;

  produit: any = {
    boutique_id: '',
    nom: '',
    description: '',
    prix_vente: 0,
    prix_promo: 0,
    en_vente: true,
    images: [],
    categorie_id: '',
    is_active: true
  };

  imagesString = '';

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService // <-- injection du service
  ) {}

  ngOnInit(): void {
    this.boutiqueId = this.route.snapshot.paramMap.get('id')!;
    this.produit.boutique_id = this.boutiqueId;

    console.log("ID boutique reçu :", this.boutiqueId);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert("Veuillez remplir les champs requis");
      return;
    }

    // Convertir images string → tableau
    this.produit.images = this.imagesString
      ? this.imagesString.split(',').map(img => img.trim())
      : [];

    console.log("Produit prêt à envoyer :");
    console.log(JSON.stringify(this.produit, null, 2));

    // ==========================
    // Envoi vers le backend
    // ==========================
    this.produitService.createProduit(this.produit).subscribe({
      next: (res) => {
        console.log("Produit enregistré avec succès :", res);
        alert("Produit ajouté avec succès !");
        form.resetForm();
        this.imagesString = '';
        // Optionnel : redirection ou reset du produit
        this.produit = {
          boutique_id: this.boutiqueId,
          nom: '',
          description: '',
          prix_vente: 0,
          prix_promo: 0,
          en_vente: true,
          images: [],
          categorie_id: '',
          is_active: true
        };
      },
      error: (err) => {
        console.error("Erreur lors de l'enregistrement :", err);
        alert(err.error?.message || "Erreur serveur");
      }
    });
  }
}