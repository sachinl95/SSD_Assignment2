import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  selectedFile: File = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.post(
      `https://www.googleapis.com/upload/drive/v3/files?uploadType=media`,
      fd
    ).subscribe(data => {
      console.log(data);
    });
  }

  post(url: string, body: any, contentType = 'image/jpeg'): Observable<any> {
    return this.httpClient.post(url, body, this.createHeader(contentType));
  }

  private createHeader(contentType: string): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        'Content-Length': this.selectedFile.size.toString(),
        Authorization: 'AIzaSyAncs20JOReMU_VZrDCSqos1eobgWgIdJM'
      })
    };
  }
}
