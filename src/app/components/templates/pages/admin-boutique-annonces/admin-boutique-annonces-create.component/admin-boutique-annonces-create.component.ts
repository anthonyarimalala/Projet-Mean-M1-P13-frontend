import { AnnonceService } from '../../../../../services/annonces/annonce.service';
import { UploadService } from '../../../../../services/upload/upload.service';
import { CreateAnnonce, Emetteur, Image } from './../../../../../models/Annonce';
import { AuthService } from './../../../../../services/auth.service';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-boutique-annonces-create',
  imports: [ ReactiveFormsModule ],
  templateUrl: './admin-boutique-annonces-create.component.html',
  styleUrls: [
    './admin-boutique-annonces-create.component.css',
    '../../admin-boutique-inputs.component/admin-boutique-inputs.component.css',
  ],
})
export class AdminBoutiqueAnnoncesCreateComponent {
  annonceForm!: FormGroup;
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  private selectedFiles = signal<File[]>([]);
  imagePreviews = signal<string[]>([]);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private annonceService: AnnonceService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.annonceForm = this.fb.group({
      titre: [
        'Titre de test',
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      ],
      description: ['Description de test.', [Validators.required, Validators.minLength(10)]],
      images: [[]],
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

      // 1️⃣ D'abord uploader les images si il y en a
      if (this.selectedFiles().length > 0) {
        this.uploadImagesAndPublish();
      } else {
        this.createAnnonce([]); // Pas d'images, créer directement l'annonce
      }
    }
  }

  private uploadImagesAndPublish(): void {
    const files = this.selectedFiles();
    const images: Image[] = [];

    this.uploadService.uploadImages(files).subscribe({
      next: (responses) => {
        // Extraire les URLs des images uploadées depuis Cloudinary
        // Adapter cette partie selon le format de réponse de votre uploadService

        for (let i = 0; i < responses.images.length; i++) {
          const image: Image = {
            url: responses.images[i].url,
            alt: responses.images[i].url,
            ordre: i + 1,
          };
          images.push(image);
        }
        console.log(images);
        this.createAnnonce(images);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set("Erreur lors de l'upload des images");
        console.error('Erreur upload :', err);
      },
    });
  }

  private createAnnonce(images: Image[]): void {
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
      cibles: ['BOUTIQUE', 'ACHETEUR'],
      images: images,
      statut: 'PUBLIEE',
      created_at: now,
      updated_at: now,
      __v: 0,
    };
    console.log('annonce: ', createAnnonce);

    this.annonceService.save(createAnnonce).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.success.set('Annonce publiée avec succès !');
        this.resetForm();

        this.annonceService.notifyAnnonceCreated();

        setTimeout(() => {
          this.success.set(null);
        }, 3000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err.error?.message || "Erreur lors de la publication de l'annonce");
        console.error('Erreur publication annonce: ', err);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);

      // Stocker seulement les fichiers localement
      this.selectedFiles.set([...this.selectedFiles(), ...files]);

      // Créer les aperçus
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      this.imagePreviews.set([...this.imagePreviews(), ...newPreviews]);

      // ❌ SUPPRIMER l'appel uploadService.uploadImages() ici
    }
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
        BOUTIQUE: false,
        ACHETEUR: false,
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
