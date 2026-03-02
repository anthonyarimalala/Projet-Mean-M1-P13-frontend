import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BoutiqueService } from '../../../../services/boutique/boutique.service';
import { ProduitService, Produit } from '../../../../services/produit/produit.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-boutique-commandes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique-commandes.component.html',
  styleUrls: ['./boutique-commandes.component.css'],
})
export class BoutiqueCommandesComponent implements OnInit {

  boutiqueId!: string;
  commandes: any[] = [];
  loading = true;
  errorMessage = '';

  expandedCommandes: Record<string, boolean> = {};

  constructor(
    private route: ActivatedRoute,
    private commandeService: BoutiqueService,
    private produitService: ProduitService,
    private cdr: ChangeDetectorRef  // <-- injecté
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.boutiqueId = params.get('id')!;
      this.loadCommandes();
    });
  }

  loadCommandes() {
    this.loading = true;

    this.commandeService.getCommandes(this.boutiqueId).subscribe({
      next: (data: any[]) => {

        const commandesObservables: Observable<any>[] = data.map(commande => {
          const produitsObs: Observable<Produit>[] = commande.boutique.produits.map((p: any) =>
            this.produitService.getProduitByid(p.produit_id)
          );

          return forkJoin(produitsObs).pipe(
            map((produitsInfos: Produit[]) => {
              commande.boutique.produits = commande.boutique.produits.map((p: any, i: number) => ({
                ...p,
                nom: produitsInfos[i].nom,
                prix_unitaire: produitsInfos[i].prix_promo ?? produitsInfos[i].prix_vente,
                total_produit: p.quantite * (produitsInfos[i].prix_promo ?? produitsInfos[i].prix_vente)
              }));
              return commande;
            })
          );
        });

        forkJoin(commandesObservables).subscribe({
          next: (resolvedCommandes) => {
            this.commandes = resolvedCommandes;
            this.loading = false;

            this.expandedCommandes = {};
            this.commandes.forEach(c => this.expandedCommandes[c.user_id] = false);

            // <-- Forcer Angular à détecter les changements
            this.cdr.detectChanges();
          },
          error: () => {
            this.errorMessage = 'Erreur lors du chargement des produits';
            this.loading = false;
            this.cdr.detectChanges();
          }
        });

      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des commandes';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleCommande(userId: string) {
    this.expandedCommandes[userId] = !this.expandedCommandes[userId];
  }

  isExpanded(userId: string) {
    return this.expandedCommandes[userId];
  }
}