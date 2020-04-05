import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-protocol',
  templateUrl: './app-protocol.page.html',
  styleUrls: ['./app-protocol.page.scss'],
})
export class AppProtocolPage implements OnInit {

  // 标题
  public title: string = '隐私政策';
  public backButton: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
