import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
  } from '@angular/core'
  
  @Component({
    selector: 'mat-file-upload',
    template: `
      <span class="file-input-text">{{ labelText }}</span>
      <button
        mat-button
        [type]="selectFilesButtonType"
        color="primary"
        class="file-input-button"
        (click)="fileInput.click()"
        [attr.aria-label]="selectButtonText"
      >
        <span>{{ selectButtonText }}</span>
        <input
          #fileInput
          type="file"
          style="display: none"
          [accept]="acceptedTypes"
          [multiple]="allowMultipleFiles"
          (change)="filesChanged($event)"
        />
      </button>
      <button
        mat-raised-button
        [type]="uploadButtonType"
        color="primary"
        class="file-input-button"
        [disabled]="!selectedFiles"
        (click)="uploadFiles()"
        *ngIf="showUploadButton"
        [attr.aria-label]="uploadButtonText"
      >
        {{ uploadButtonText }}
      </button>
      <span class="file-input-text">{{ selectedFileText }}</span>
      <button
        mat-icon-button
        (click)="filesChanged(undefined)"
        type="button"
        aria-label="Remove Selected File(s)"
         *ngIf="selectedFiles != null && selectedFiles.length > 0"
      >
          <mat-icon>close</mat-icon>
      </button>
    `,
    styles: [
      '.file-input-button { margin-right: 8px !important }',
      '.file-input-text { font-size: 14px !important; margin-right: 8px !important }',
    ],
  })
  export class MatFileUploadComponent {
    @Input() labelText = 'Select File(s)';
    @Input() selectButtonText = 'Select File(s)';
    @Input() selectFilesButtonType: 'button' | 'menu' | 'reset' | 'submit' = 'button';
    @Input() uploadButtonText = 'Upload File(s)';
    @Input() uploadButtonType: 'button' | 'menu' | 'reset' | 'submit' = 'button';
    @Input() allowMultipleFiles = false;
    @Input() showUploadButton = true;
    @Input() acceptedTypes = '*.*';
   
    @Output() uploadClicked: EventEmitter<FileList> = new EventEmitter<FileList>();
    @Output() selectedFilesChanged: EventEmitter<FileList> = new EventEmitter<FileList>();
  
    @ViewChild('fileInput') fileInputRef: ElementRef | undefined
    selectedFiles: FileList | undefined
    selectedFileText = '';

    constructor(private http: HttpClient) {}
  
    filesChanged(event: any): void {
      console.log(event)
      if(event && event.target && event.target.files) {
        this.selectedFiles = event.target.files
        this.selectedFilesChanged.emit(this.selectedFiles)
        this.selectedFileText = (this.selectedFiles as any)[0].name     
      } else {
        this.resetFileInput()
      }
    }
  
    uploadFiles(): void {
      this.uploadClicked.emit(this.selectedFiles)

      const httpOptions = {
        headers: new HttpHeaders({
         "Content-Type": "multipart/form-data" 
        })
      };
      
      const formData = new FormData();
      formData.append("blobFile", ((this.selectedFiles as any)[0] as any));
     
      this.http.post('https://europe-west1-hack-team-netrai.cloudfunctions.net/uploader-function-1', formData).subscribe(item => {
        console.log(item)
      })
      // this.resetFileInput()
    }
  
    resetFileInput(): void {
      this.selectedFileText = '';
      (this.fileInputRef as ElementRef).nativeElement.value = ''
    }
  }