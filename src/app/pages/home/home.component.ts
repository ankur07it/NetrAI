import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {

  message = {};
    messages: Array<any> = [];



    sendMessage(message: string) {
        // if (message === "") return;
        // this.messages.push({ 'class': 'message-sent', 'value': message });
        // // this.messages.push({ 'class': 'message-received', 'value': 'eyo tryo againo lato m8o' });

        // // Connect with chatbot api to receive a response
        // this.chatbot.getResponse(message).subscribe((res: { [x: string]: any; }) => {
        //     // Add response to list of messages
        //     this.messages.push({ 'class': 'message-received', 'value': res['value'] });
        // });
    }

    onKeyDown(event: any) { // without type info
        this.sendMessage(event.target.value);
    }

}
