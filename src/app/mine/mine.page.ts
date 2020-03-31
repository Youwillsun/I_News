import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { CommonDataService } from '../share/service/common-data.service';
import { environment } from 'src/environments/environment';
import { IonicService } from '../share/service/ionic.service';
import { INEncrypt } from '../share/class/INEncrypt';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

  // 标题
  public title = '我的';
  // 用户id
  public userId: any;
  // 存储用户个性标签
  public userTag = [];
  // 存储用户昵称
  public nickName: string;
  // 存储用户个性签名
  public userSign: string;
  // 存储信息数量
  public msgNum: number;
  // 存储用户头像
  public userPhoto: string;
  // 默认头像
  public defaultUserPhoto: string = 'https://s2.ax1x.com/2020/03/03/34B4cF.png';
  // 是否为管理员
  public administrator: boolean = false;

  constructor(
    public router: Router,
    public alertController: AlertController,
    public http: HttpClient,
    public commonData: CommonDataService,
    public ionic: IonicService
  ) {
    // ionic 自带的返回按钮返回不会触发页面的ngOnInit钩子，所以通过监听路由来实现
    router.events.subscribe((event: NavigationEnd) => {
      if (event.url == "/tabs/mine") {
        // 调用个人信息函数
        this.userInfo();
        // 调用消息数量函数
        this.messageNum();
      }
    })
  }

  ngOnInit() {
    // 从本地中获取用户id
    this.userId = INEncrypt.basicDecrypt(window.localStorage.getItem('userId'));
    // 调用个人信息函数
    this.userInfo();
    // 调用消息数量函数
    this.messageNum();
    // 判断用户是否为管理员
    let account = INEncrypt.basicDecrypt(window.localStorage.getItem('account'));
    if (account === '15515182060') {
      this.administrator = true;
    }
  }

  // 获取个人信息
  userInfo() {
    this.http.post<any>(environment.rootPath + "getUserInfo", { id: this.userId }).subscribe((data: any) => {
      if (data.status === 'success') {
        let res = data.data;
        // 用户头像
        if (!res.userPhoto) {
          this.userPhoto = this.defaultUserPhoto;
        } else {
          this.userPhoto = res.userPhoto;
        }
        // 昵称
        if (!res.nickName) {
          this.nickName = '暂无';
        } else {
          this.nickName = res.nickName;
        }

        // 个性签名
        if (!res.introduction) {
          this.userSign = '太懒啦，什么都没写！';
        } else {
          this.userSign = res.introduction;
        }
        // 个性标签
        if (!res.personalityLabel) {
          this.userTag.push({ color: 'primary', tag: "暂无" });
        } else {
          this.userTag = this.commonData.matchLabel(res.personalityLabel);
        }
      } else {
        this.ionic.Toast(data.data.msg, "danger", "top");
      }
    }, err => {
      throw new Error(err);
    });
  }

  // 获取消息数量
  messageNum() {
    this.http.get<any>(environment.rootPath + "getMessageInfo").subscribe((data: any) => {
      if (data.status === 'success') {
        this.msgNum = data.data;
      } else {
        this.ionic.Toast(data.data.msg, "danger", "top");
      }
    }, err => {
      throw new Error(err);
    });
  }

  // 去完善信息界面
  toUserInfo() {
    this.router.navigate(['/userinfo']);
  }

  // 去我的收藏界面
  toMyCollect() {
    this.router.navigate(['/my-collects']);
  }

  // 去消息通知界面
  toMessage() {
    this.http.post<any>(environment.rootPath + "updateMsgIdentify", {}).subscribe((data: any) => {
      if (data.status === 'success') {
        this.router.navigate(['/message']);
      } else {
        this.ionic.Toast(data.data.msg, "danger", "top");
      }
    });
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
            window.localStorage.removeItem('userId');
            // 路由到登录页面
            this.router.navigate(["/login"])
          }
        }
      ]
    });
    await alert.present();
  }

}