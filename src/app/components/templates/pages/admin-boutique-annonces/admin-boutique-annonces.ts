import { Component } from '@angular/core';
import { AdminBoutiqueAnnoncesCreateComponent } from "./admin-boutique-annonces-create.component/admin-boutique-annonces-create.component";
import { AdminBoutiqueAnnoncesListComponent } from "./admin-boutique-annonces-list.component/admin-boutique-annonces-list.component";

@Component({
  selector: 'app-admin-boutique-annonces',
  imports: [AdminBoutiqueAnnoncesCreateComponent, AdminBoutiqueAnnoncesListComponent],
  templateUrl: './admin-boutique-annonces.html',
  styleUrl: './admin-boutique-annonces.css',
})
export class AdminBoutiqueAnnonces {

}
