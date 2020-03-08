import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { DateMethod } from '../share/class/DateMethod';
import { CommonDataService } from '../share/service/common-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

  // 标题
  public title = '我的';
  // 用户id
  public regId: any;
  // 存储用户个性标签
  public userTag = [];
  // 存储用户昵称
  public nickName: string;
  // 存储用户个性签名
  public userSign: string;
  // 存储信息数量
  public msgNum: number;

  constructor(
    public router: Router,
    public alertController: AlertController,
    public http: HttpClient,
    public commonData: CommonDataService
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
    this.regId = window.localStorage.getItem('regId');
    // 调用个人信息函数
    this.userInfo();
    // 调用消息数量函数
    this.messageNum();
  }

  // 获取个人信息
  userInfo() {
    this.http.get<any>(environment.baseUrl+"ApiRoot/UserInfo/GetUserInfo?id=" + this.regId).subscribe((data: any) => {
      if (data.Status === 'ok') {
        data.List.forEach((item: any) => {
          // 存储用户id
          window.localStorage.setItem('userId', item.Id);
          
          // 昵称
          if (!item.nickName) {
            this.nickName = '暂无';
          } else {
            this.nickName = item.nickName;
          }
          // 存储昵称
          window.localStorage.setItem('nickName',this.nickName);

          // 个性签名
          if (!item.city) {
            this.userSign = '太懒啦，什么都没写！';
          } else {
            this.userSign = item.city;
          }
          // 个性标签
          if (!item.province) {
            this.userTag.push({ color: 'primary', tag: "暂无" });
          } else {
            this.userTag = this.commonData.matchLabel(item.province);
          }
        });
      } else {
        throw new Error('data有误');
      }
    }, err => {
      throw new Error(err);
    });
  }

  // 获取消息数量
  messageNum() {
    this.http.get<any>("../../assets/data/message.json").subscribe((data: any) => {
      if (data.statusText === 'OK') {
        let res = data.data;
        // 定义初始值
        let count = 0;
        res.forEach((item: any, index: number) => {
          if (DateMethod.compare(item.time) === 'ok') {
            count++;
          }
          if (index + 1 === res.length) {
            this.msgNum = count;
          }
        });
      } else {
        throw new Error('data有误');
      }
    }, err => {
      throw new Error(err);
    });
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


// name           名字
// age            null
// phone          手机
// nickName       昵称
// vipName        QQ
// country        微信
// province       个性标签
// city           个人签名
// county         出生日期