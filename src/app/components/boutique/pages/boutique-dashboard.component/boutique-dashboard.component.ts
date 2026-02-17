import { Component } from '@angular/core';
import { AdminBoutiqueAnnoncesCreateComponent } from "../../../templates/pages/admin-boutique-annonces/admin-boutique-annonces-create.component/admin-boutique-annonces-create.component";
import { AdminBoutiqueAnnonces } from "../../../templates/pages/admin-boutique-annonces/admin-boutique-annonces";

@Component({
  selector: 'app-boutique-dashboard.component',
  imports: [AdminBoutiqueAnnonces],
  templateUrl: './boutique-dashboard.component.html',
  styleUrl: './boutique-dashboard.component.css',
})
export class BoutiqueDashboardComponent {

}
