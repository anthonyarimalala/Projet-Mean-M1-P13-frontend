import { AnnonceService } from '../../../../../services/annonces/annonce.service';
import { Annonce, CreateAnnonce, Emetteur } from './../../../../../models/Annonce';
import { AuthService } from './../../../../../services/auth.service';
import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-annonces-create',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-annonces-create.component.html',
  styleUrls: [
    './admin-annonces-create.component.css',
    '../../admin-inputs.component/admin-inputs.component.css',
  ],
})
export class AdminAnnoncesCreateComponent implements OnInit, OnDestroy {
  annonceForm!: FormGroup;
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  isLoading = signal<boolean>(false); // <-- AJOUT: Signal pour le chargement
  private selectedFiles = signal<File[]>([]);
  imagePreviews = signal<string[]>([]);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private annonceService: AnnonceService
  ) {}

  ngOnInit(): void {
    this.annonceForm = this.fb.group({
      titre: [
        'Titre de test',
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      ],
      description: [
        'Description de test.',
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)],
      ],
      destinataires: this.fb.group(
        {
          BOUTIQUE: [false],
          ACHETEUR: [false],
        },
        { validators: this.atLeastOneChecked.bind(this) } // ✅ validator personnalisé
      ),
    });
  }

  // Validator personnalisé : au moins un destinataire sélectionné
  atLeastOneChecked(group: FormGroup): { [key: string]: boolean } | null {
    const boutiques = group.get('BOUTIQUE')?.value;
    const acheteurs = group.get('ACHETEUR')?.value;
    return boutiques || acheteurs ? null : { noDestinataire: true };
  }

  get canPublish(): boolean {
    return this.annonceForm.valid;
  }

  publishAnnonce(): void {
    if (this.annonceForm.valid) {
      this.isLoading.set(true);
      this.error.set(null);

      const destinatairesValue = this.annonceForm.get('destinataires')?.value;

      const cibles: string[] = Object.keys(destinatairesValue).filter(
        (key) => destinatairesValue[key]
      );

      const now = new Date().toISOString();
      const emetteur: Emetteur = {
        user_id: this.authService.getId() ?? '',
        role: this.authService.getRole() ?? '',
      };

      const createAnnonce: CreateAnnonce = {
        titre: this.annonceForm.get('titre')?.value,
        description: this.annonceForm.get('description')?.value,
        emetteur: emetteur,
        boutique_id: null,
        cibles: cibles,
        images: [],
        statut: 'PUBLIEE',
        created_at: now,
        updated_at: now,
        __v: 0,
      };

      console.log(this.annonceForm.get('destinataires')?.value);

      this.annonceService.save(createAnnonce).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.success.set('Annonce publiée avec succès !');
          this.resetForm();

          setTimeout(() => {
            this.success.set(null);
          }, 3000);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.error.set(err.error?.message || 'Erreur lors de la publication de l\'annonce');
          console.error("Erreur publication annonce: ", err);
        },
      })

      // const { destinataires, ...data } = this.annonceForm.value;
      // const annonce : Annonce = data;

      // console.log(this.annonceForm.get('titre')?.value);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.selectedFiles.set([...this.selectedFiles(), ...files]);

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      this.imagePreviews.set([...this.imagePreviews(), ...newPreviews]);
    }
    // Reset l'input pour permettre de sélectionner le même fichier
    input.value = '';
  }

  removeImage(index: number): void {
    const currentPreviews = this.imagePreviews();
    const currentFiles = this.selectedFiles();

    URL.revokeObjectURL(currentPreviews[index]);

    this.imagePreviews.set(currentPreviews.filter((_, i) => i !== index));
    this.selectedFiles.set(currentFiles.filter((_, i) => i !== index));
  }

  resetForm(): void {
    this.annonceForm.reset({
      titre: '',
      description: '',
      destinataires: {
        boutiques: false,
        acheteurs: false,
      },
    });

    // Nettoyer les images
    this.imagePreviews().forEach((url) => URL.revokeObjectURL(url));
    this.imagePreviews.set([]);
    this.selectedFiles.set([]);
    this.error.set(null);
  }

  ngOnDestroy(): void {
    this.imagePreviews().forEach((url) => URL.revokeObjectURL(url));
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get titre() {
    return this.annonceForm.get('titre');
  }
  get description() {
    return this.annonceForm.get('description');
  }
  get destinataires() {
    return this.annonceForm.get('destinataires');
  }
}
