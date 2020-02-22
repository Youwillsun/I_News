import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  // 去完善信息界面
  toUserInfo() {
    this.router.navigate(['/userinfo']);
  }

  // 去消息通知界面
  toMessage(){
    this.router.navigate(['/message']);
  }

  // 去联系我们界面
  toContact(){
    this.router.navigate(['/contact'])
  }

}
