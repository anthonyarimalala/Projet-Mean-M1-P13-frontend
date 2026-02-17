import { Component, signal, OnInit, OnDestroy, computed } from '@angular/core';
import { UserService } from '../../../../../services/user/user.service';
import { UserList } from '../../../../../models/User';
import { Subscription } from 'rxjs';
import { InitialsPipe } from '../../../../../pipes/initials-pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  imports: [InitialsPipe, CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  users = signal<UserList[]>([]);

  // Signaux pour les filtres
  searchTerm = signal<string>('');
  selectedRole = signal<string>('');
  dateDebut = signal<string>('');
  dateFin = signal<string>('');

  private subscription: Subscription | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadInitialUsers();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadInitialUsers(): void {
    this.subscription = this.userService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        console.log('Utilisateurs chargés:', users);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      },
    });
  }

  // Computed values pour les utilisateurs filtrés
  filteredUsers = computed(() => {
    return this.users().filter(user => {
      // Filtre par recherche (nom, prénom, email)
      const searchTermLower = this.searchTerm().toLowerCase();
      const searchMatch = !this.searchTerm() ||
        `${user.prenom} ${user.nom} ${user.email}`.toLowerCase().includes(searchTermLower);

      // Filtre par rôle
      const roleMatch = !this.selectedRole() || user.role === this.selectedRole();

      // Filtre par date
      let dateMatch = true;
      if (this.dateDebut() && this.dateFin()) {
        const userDate = new Date(user.created_at).getTime();
        const debut = new Date(this.dateDebut()).setHours(0, 0, 0, 0);
        const fin = new Date(this.dateFin()).setHours(23, 59, 59, 999);
        dateMatch = userDate >= debut && userDate <= fin;
      }

      return searchMatch && roleMatch && dateMatch;
    });
  });

  // Total des utilisateurs filtrés
  totalFilteredUsers = computed(() => {
    return this.filteredUsers().length;
  });

  // Nombre de nouveaux utilisateurs ce mois-ci (parmi les utilisateurs filtrés)
  nouveauxCeMois = computed(() => {
    const maintenant = new Date();
    const debutMois = new Date(maintenant.getFullYear(), maintenant.getMonth(), 1);
    const finMois = new Date(maintenant.getFullYear(), maintenant.getMonth() + 1, 0, 23, 59, 59, 999);

    return this.filteredUsers().filter(user => {
      const dateCreation = new Date(user.created_at);
      return dateCreation >= debutMois && dateCreation <= finMois;
    }).length;
  });

  // Vérifie si des filtres sont actifs
  hasActiveFilters = computed(() => {
    return this.searchTerm() || this.selectedRole() || this.dateDebut() || this.dateFin();
  });

  // Obtenir les rôles uniques depuis les données
  getUniqueRoles = computed(() => {
    const rolesSet = new Set(this.users().map(user => user.role));
    return Array.from(rolesSet).sort();
  });

  // Méthodes de gestion des filtres
  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  onRoleChange(value: string): void {
    this.selectedRole.set(value);
  }

  onDateDebutChange(value: string): void {
    this.dateDebut.set(value);
  }

  onDateFinChange(value: string): void {
    this.dateFin.set(value);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedRole.set('');
    this.dateDebut.set('');
    this.dateFin.set('');
  }

  // Méthode pour supprimer un utilisateur
  // deleteUser(userId: string): void {
  //   if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
  //     this.userService.deleteUser(userId).subscribe({
  //       next: () => {
  //         this.users.set(this.users().filter(user => user.id !== userId));
  //         console.log('Utilisateur supprimé avec succès');
  //       },
  //       error: (error) => {
  //         console.error('Erreur lors de la suppression:', error);
  //       }
  //     });
  //   }
  // }
}
