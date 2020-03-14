import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  public title: string = '联系我们';
  public backButton:boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
