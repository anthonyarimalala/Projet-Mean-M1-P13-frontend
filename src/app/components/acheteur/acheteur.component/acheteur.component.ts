import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acheteur',
  imports: [CommonModule],
  // templateUrl: './acheteur.component.html',
  template: `
    @if(errorMessage()){
    <div class="error">{{ errorMessage() }}</div>
    } @for(article of articles(); track article.id){
    <div>
      <h2>{{ article.title }}</h2>
      <p>{{ article.content }}</p>
      <hr />
    </div>
    }
  `,
  styleUrl: './acheteur.component.css',
})
export class AcheteurComponent {
  articles = signal<any[]>([]);
  errorMessage = signal('');

  

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.http.get<any[]>('http://localhost:5000/api/articles').subscribe({
      next: (data) => this.articles.set(data),
      error: (err) => this.errorMessage.set(err.error?.message || 'Erreur serveur'),
    });
  }
}
