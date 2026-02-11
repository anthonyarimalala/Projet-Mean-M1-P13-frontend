import { Component } from '@angular/core';
import { AdminAnnoncesListComponent } from "../admin-annonces-list.component/admin-annonces-list.component";
import { AdminAnnoncesCreateComponent } from "../admin-annonces-create.component/admin-annonces-create.component";

@Component({
  selector: 'app-admin-annonces',
  imports: [AdminAnnoncesListComponent, AdminAnnoncesCreateComponent],
  templateUrl: './admin-annonces.component.html',
  styleUrl: './admin-annonces.component.css',
})
export class AdminAnnoncesComponent {

}
