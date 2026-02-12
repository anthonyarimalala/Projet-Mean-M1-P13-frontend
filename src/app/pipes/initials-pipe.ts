import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {

  transform(user: any): string {
    if (user?.prenom && user?.nom) {
      const prenomInitial = user.prenom.charAt(0).toUpperCase();
      const nomInitial = user.nom.charAt(0).toUpperCase();
      return `${prenomInitial}${nomInitial}`;
    }
    return '??';
  }

}
