import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// ionic的alert弹窗
import { AlertController, ToastController } from '@ionic/angular';

// 引入加解密算法
import { INEncrypt } from '../share/class/INEncrypt'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // 判断是否为登录页面
  public isLogin: boolean;

  // 存储登录页面账号
  public loginAccount: string;
  // 存储登录页面密码
  public loginPwd: string;

  // 存储注册页面昵称
  // public registerNickName: string;
  // 存储注册页面账号
  public registerAccount: string;
  // 存储注册页面mima:
  public registerPwd: string;
  // 存储注册页面确认密码
  public registerPwdAgain: string;

  constructor(
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    // 默认显示登录页
    this.isLogin = true;
    // 初始化登录
    this.initializeLogin();
  }

  // 初始化登录,判断是否显示登录页面
  initializeLogin() {
    // 获取本地存储的账号密码
    let account = window.localStorage.getItem('account');
    let pwd = window.localStorage.getItem('password');
    if (account && pwd) {
      console.log(INEncrypt.basicDecrypt(account), INEncrypt.basicDecrypt(pwd));
      // 用户登录过，直接显示首页
      this.router.navigate(['/tabs']);
    } else if (!account || !pwd) {
      this.isLogin = true;
    } else {
      throw Error('初始化登录失败');
    }
  }

  // 显示注册页
  public registerPage() {
    this.isLogin = false;
  }

  // 显示登录页
  public loginPage() {
    this.isLogin = true;
  }

  // 登录函数
  public login() {
    if (this.loginAccount && this.loginPwd) {
      // 向后台发送账号密码验证成功则登录
      console.log(this.loginAccount, this.loginPwd);
      // 成功登录 在本地存储中存储账号密码
      window.localStorage.setItem('account', INEncrypt.basicEncrypt(this.loginAccount));
      window.localStorage.setItem('password', INEncrypt.basicEncrypt(this.loginPwd));
      // 跳转到首页
      this.router.navigate(['/tabs']);
    } else {
      const message = '账号或密码有误，请检查！';
      this.presentToast(message);
    }
  }

  // 注册函数
  public register() {
    if (this.registerAccount && this.registerPwd && this.registerPwdAgain) {
      // 手机号判断正则
      const phoneRegExp = new RegExp('^[0-9]{11}$');
      // 密码判断正则
      const pwdRegExp = new RegExp('^[A-Za-z0-9]{6,12}$');

      if (phoneRegExp.test(this.registerAccount) && pwdRegExp.test(this.registerPwd)) {
        if (this.registerPwd === this.registerPwdAgain) {
          console.log(this.registerPwd, this.registerAccount);
          // 向后台发送账号密码
          // 注册成功显示登录页面
          this.isLogin = true;
        } else {
          const message = '两次密码不一致！';
          this.presentToast(message);
        }
      } else {
        const message = '手机号或密码格式有误！';
        this.presentToast(message);
      }

    } else {
      const message = '请完善注册信息！';
      this.presentToast(message);
    }
  }

  /**
   * ionic toast 函数
   * @param toastMessage toast显示的字符串
   */
  async presentToast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 1500,
      position: "top",
      color: "danger"
    });
    toast.present();
  }



}
