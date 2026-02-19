import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-demande-location',
  imports: [CommonModule],
  templateUrl: './demande-location.component.html',
  styleUrl: './demande-location.component.css',
})
export class DemandeLocationComponent {
  ngAfterViewInit() {
    this.setupMessageTooltips();
  }

  setupMessageTooltips() {
    const rows = document.querySelectorAll('.row[data-message]');
    const tooltip = document.getElementById('messageTooltip');

    if (!tooltip) return;

    rows.forEach(row => {
      row.addEventListener('mouseenter', (e) => {
        const target = e.currentTarget as HTMLElement;
        const message = target.dataset['message'];

        if (message) {
          tooltip.textContent = message;
          tooltip.classList.add('visible');

          // Positionner le tooltip
          const rect = target.getBoundingClientRect();
          tooltip.style.left = rect.left + 'px';
          tooltip.style.top = (rect.bottom + 10) + 'px';
          tooltip.style.maxWidth = Math.min(400, rect.width) + 'px';
        }
      });

      row.addEventListener('mousemove', (e) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 10) + 'px';
      });

      row.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });
    });

    // Cacher le tooltip si on scroll
    window.addEventListener('scroll', () => {
      tooltip.classList.remove('visible');
    }, { passive: true });
  }
}
