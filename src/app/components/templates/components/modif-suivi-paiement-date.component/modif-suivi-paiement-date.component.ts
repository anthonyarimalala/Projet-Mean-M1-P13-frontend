import { Component, Input, OnInit, signal, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  HistoriquePaiement,
  HistoriquePaiementService,
} from '../../../../services/paiement/historique-paiement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modif-suivi-paiement-date.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modif-suivi-paiement-date.component.html',
  styleUrls: [
    './modif-suivi-paiement-date.component.css',
    '../../pages/admin-boutique-inputs.component/admin-boutique-inputs.component.css',
  ],
})
export class ModifSuiviPaiementDateComponent implements OnInit, OnDestroy {
  @Input() paiementId!: string;
  historiquePaiement = signal<HistoriquePaiement | null>(null);

  paiementForm: FormGroup;
  sauvegardeEnCours = signal<boolean>(false);
  messageConfirmation: string | null = null;
  erreur: string | null = null;

  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private paiementService: HistoriquePaiementService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialisation du formulaire avec des valeurs par défaut
    this.paiementForm = this.fb.group({
      montant: ['', [Validators.required, Validators.min(1), Validators.max(10000000)]],
      date_prevue: ['', Validators.required],
      statut: ['EN_ATTENTE'],
      mode_paiement: ['CASH'],
      date_paiement: [''],
      payeur: [''],
      note: [''],
      show_to_user: [true],
    });
  }

  ngOnInit() {
    // Gestion des validateurs conditionnels selon le statut
    this.paiementForm.get('statut')?.valueChanges.subscribe((statut) => {
      this.mettreAJourValidateurs(statut);
    });

    // Récupération de l'ID depuis la route ou l'input
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.paiementId = id;
        this.chargerPaiement();
      } else if (this.paiementId) {
        this.chargerPaiement();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  mettreAJourValidateurs(statut: string) {
    const datePaiementControl = this.paiementForm.get('date_paiement');
    const payeurControl = this.paiementForm.get('payeur');

    // Réinitialiser les validateurs
    datePaiementControl?.clearValidators();
    payeurControl?.clearValidators();

    if (statut === 'PAYE') {
      datePaiementControl?.setValidators([Validators.required]);
      payeurControl?.setValidators([Validators.required, Validators.minLength(2)]);
    }

    datePaiementControl?.updateValueAndValidity();
    payeurControl?.updateValueAndValidity();
  }

  chargerPaiement() {
    if (!this.paiementId) {
      this.erreur = "ID du paiement manquant";
      return;
    }

    this.paiementService.getPaiementById(this.paiementId).subscribe({
      next: (data: HistoriquePaiement) => {
        this.historiquePaiement.set(data);
        
        // Mise à jour du formulaire
        this.paiementForm.patchValue({
          montant: data.montant,
          date_prevue: this.formatDatePourInput(data.date_prevue),
          statut: data.statut,
          mode_paiement: data.mode_paiement,
          date_paiement: data.date_paiement ? this.formatDatePourInput(data.date_paiement) : '',
          payeur: data.payeur || '',
          note: data.note || '',
          show_to_user: data.show_to_user !== undefined ? data.show_to_user : true,
        });

        // Mettre à jour les validateurs selon le statut
        this.mettreAJourValidateurs(data.statut);
      },
      error: (err) => {
        this.erreur = 'Erreur lors du chargement du paiement';
        console.error('Erreur:', err);
        
        if (err.status === 404) {
          this.erreur = 'Paiement non trouvé';
          setTimeout(() => this.router.navigate(['/paiements']), 3000);
        }
      },
    });
  }

  sauvegarder() {
    // Marquer tous les champs comme touchés pour afficher les erreurs
    Object.keys(this.paiementForm.controls).forEach((key) => {
      this.paiementForm.get(key)?.markAsTouched();
    });

    if (this.paiementForm.invalid) {
      this.erreur = 'Veuillez corriger les erreurs dans le formulaire';
      return;
    }

    this.sauvegardeEnCours.set(true);
    this.erreur = null;

    const formValue = this.paiementForm.value;
    
    // Construction de l'objet à envoyer
    const donneesAEnvoyer: any = {
      montant: Number(formValue.montant),
      date_prevue: new Date(formValue.date_prevue).toISOString(),
      statut: formValue.statut,
      mode_paiement: formValue.mode_paiement,
      note: formValue.note || '',
      show_to_user: formValue.show_to_user,
    };

    // Ajout des champs conditionnels pour le statut PAYE
    if (formValue.statut === 'PAYE') {
      if (formValue.date_paiement) {
        donneesAEnvoyer.date_paiement = new Date(formValue.date_paiement).toISOString();
      }
      if (formValue.payeur) {
        donneesAEnvoyer.payeur = formValue.payeur;
      }
    }

    this.subscription.add(
      this.paiementService.updatePaiement(this.paiementId, donneesAEnvoyer)
        .pipe(
          finalize(() => {
            this.sauvegardeEnCours.set(false);
          })
        )
        .subscribe({
          next: (response) => {
            this.messageConfirmation = 'Paiement modifié avec succès';
            
            if (response) {
              this.historiquePaiement.set(response);
            }
            
            setTimeout(() => {
              this.messageConfirmation = null;
            }, 3000);
          },
          error: (err) => {
            this.erreur = err.error?.message || 'Erreur lors de la modification';
            console.error('Erreur:', err);
          },
        })
    );
  }

  annuler() {
    this.router.navigate(['/paiements']);
  }

  private formatDatePourInput(dateIso: string): string {
    if (!dateIso) return '';
    
    try {
      const date = new Date(dateIso);
      if (isNaN(date.getTime())) {
        return '';
      }
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch {
      return '';
    }
  }

  // Getters pour le template
  get montant() { return this.paiementForm.get('montant'); }
  get datePrevue() { return this.paiementForm.get('date_prevue'); }
  get datePaiement() { return this.paiementForm.get('date_paiement'); }
  get payeur() { return this.paiementForm.get('payeur'); }
  get statut() { return this.paiementForm.get('statut'); }
}