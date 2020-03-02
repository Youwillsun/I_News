import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

  constructor(
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  // 去完善信息界面
  toUserInfo() {
    this.router.navigate(['/userinfo']);
  }

  // 去消息通知界面
  toMessage() {
    this.router.navigate(['/message']);
  }

  // 去联系我们界面
  toContact() {
    this.router.navigate(['/contact'])
  }

  // 退出登录
  async userExit() {
    // 提示用户是否确定退出
    const alert = await this.alertController.create({
      header: '退出登录',
      message: '<strong>您确定退出当前账号吗？</strong>',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        }, {
          text: '确定',
          handler: () => {
            // 删除本地存储信息[账号和密码]
            window.localStorage.removeItem('account');
            window.localStorage.removeItem('password');
            // 路由到登录页面
            this.router.navigate(["/login"])
          }
        }
      ]
    });
    await alert.present();
  }

}
