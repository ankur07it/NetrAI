import { Component } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private base: BaseService) {
    this.base.reset.subscribe(item => {
      if (item) {
        this.message = {};
        this.messages = [];
        this.title = 'Lets start with upload something..';
      }
    })
  }

  message = {};
  title = 'Lets start with upload something..';
  messages: Array<any> = [];

  sendMessage(selectedFiles: any) {
    const formData = new FormData();
    formData.append("blobFile", ((selectedFiles as any)[0] as any));
    this.title = 'Loading...'
    this.base.getData('https://europe-west1-hack-team-netrai.cloudfunctions.net/uploader-function-1', formData).subscribe((item: any) => {
      console.log(item);
      this.message = {};
      this.messages = [];
      const msg = item.msg[0].predictions[0].structValue.fields.content.stringValue;
      const finalObj = msg.split('\n\n');
      this.title = finalObj[1] ? finalObj[0] : 'Summarize';
      const val = finalObj[1] ? finalObj[1] : finalObj[0];
      this.messages.push({ 'class': 'message-received', 'value': val });
      this.base.resetCall(false);
    });
  }
}


