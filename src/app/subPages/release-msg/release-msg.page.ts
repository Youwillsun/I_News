import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-release-msg',
  templateUrl: './release-msg.page.html',
  styleUrls: ['./release-msg.page.scss'],
})
export class ReleaseMsgPage implements OnInit {

    // 标题
    public title: string = "发布消息";
    public backButton: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
