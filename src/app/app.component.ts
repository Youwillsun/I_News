import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // 用于判断返回键是否触发
  public backButtonPressed = false;
  public customBackActionSubscription: Subscription;
  public url: string;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private minimize: AppMinimize,
    public toastController: ToastController
  ) {
    this.initializeApp();
    this.initRouterListen();
  }

  // 初始化APP
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#4FB18C'); //状态栏的样式设置
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.registerBackButtonAction();
    });
  }
  // 注册返回按钮事件
  registerBackButtonAction() {
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
      if (this.url === '/tabs/index'
        || this.url === '/tabs/class'
        || this.url === '/tabs/chart'
        || this.url === '/tabs/mine') { // 监测到当前路由，判断是否要退出程序
        if (this.backButtonPressed) {
          this.minimize.minimize(); // 程序最小化
          this.backButtonPressed = false;
        } else {
          this.miniApp(); // 提示toast
          this.backButtonPressed = true;
          setTimeout(() => this.backButtonPressed = false, 2000);
        }
      }
    });
  }

  // 初始化路由监听
  initRouterListen() {
    this.router.events.subscribe(event => { // 需要放到最后一个执行
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        console.log(this.url);
      }
    });
  }

  // 退出APP提示
  async miniApp() {
    const toast = await this.toastController.create({
      message: '再按一次退出应用',
      duration: 1000
    });
    toast.present();
  }
}
