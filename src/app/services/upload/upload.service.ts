import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = `${environment.apiUrl}/upload`;
  // private apiUrl = 'http://localhost:5000/api/upload';

  constructor(private http: HttpClient) {}

  uploadImages(files: File[]) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('images', file);
    });

    return this.http.post<{ images: { url: string; public_id: string }[] }>(this.apiUrl, formData);
  }

  deleteImage(public_id: string) {
    return this.http.request('delete', this.apiUrl, {
      body: { public_id },
    });
  }
}
