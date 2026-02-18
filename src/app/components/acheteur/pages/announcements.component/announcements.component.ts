import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Announcement, Comment, Shop } from '../../models/buyer-models';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css', '../../styles.css']
})
export class AnnouncementsComponent {
  announcements: Announcement[] = [];
  shops: Shop[] = [];
  commentAuthor: Record<number, string> = {};
  commentContent: Record<number, string> = {};

  constructor(private readonly dataService: DataService) {
    this.announcements = this.dataService.getAnnouncements();
    this.shops = this.dataService.getShops();
  }

  getComments(announcementId: number): Comment[] {
    return this.dataService.getCommentsByAnnouncement(announcementId);
  }

  addComment(announcementId: number) {
    const content = (this.commentContent[announcementId] || '').trim();
    if (!content) {
      return;
    }
    this.dataService.addComment(announcementId, 'Acheteur', content);
    this.commentContent[announcementId] = '';
  }
}
