import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IonicService } from '../share/service/ionic.service';
// 引入加解密算法
import { INEncrypt } from '../share/class/INEncrypt';
import { environment } from 'src/environments/environment';


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

  // 存储注册页面账号
  public registerAccount: string;
  // 存储注册页面mima:
  public registerPwd: string;
  // 存储注册页面确认密码
  public registerPwdAgain: string;
  // 判断是否选择用户协议
  public userAgreeMement: boolean = true;

  // 存储用户id
  public userId: string;

  constructor(
    public router: Router,
    public http: HttpClient,
    public ionic: IonicService
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
      const headerOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) };
      this.http.post<any>(environment.rootPath + 'loginAndRegister/login', { account: this.loginAccount, password: this.loginPwd }, headerOption).subscribe((data: any) => {
        if (data.status === 'success') {
          // 用户id
          this.userId = data.data.id;
          // 提示用户登录成功
          this.ionic.Toast('登录成功', "success", "top");
          // 登录成功消失，进入首页
          setTimeout(() => {
            // 成功登录 在本地存储中存储账号密码
            window.localStorage.setItem('account', INEncrypt.basicEncrypt(this.loginAccount));
            window.localStorage.setItem('password', INEncrypt.basicEncrypt(this.loginPwd));
            // 存储userid
            window.localStorage.setItem('userId', this.userId);
            // 跳转到首页
            this.router.navigate(['/tabs']);
          }, 1500);
        } else {
          this.ionic.Toast('账号或密码有误，请检查！', 'danger', "top");
        }
      }, err => {
        throw new Error(err);
      });
    } else {
      this.ionic.Toast('账号或密码有误，请检查！', 'danger', "top");
    }
  }

  // 是否同意用户协议
  public agreement() {
    if (this.userAgreeMement === true) {
      this.userAgreeMement = false;
    } else {
      this.userAgreeMement = true;
    }
  }

  // 注册函数
  public register() {
    if (this.userAgreeMement) {
      if (this.registerAccount && this.registerPwd && this.registerPwdAgain) {
        // 手机号判断正则
        const phoneRegExp = new RegExp('^[0-9]{11}$');
        // 密码判断正则
        const pwdRegExp = new RegExp('^[A-Za-z0-9]{6,12}$');

        if (phoneRegExp.test(this.registerAccount) && pwdRegExp.test(this.registerPwd)) {
          if (this.registerPwd === this.registerPwdAgain) {
            // 向后台发送账号密码
            const header = { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) };
            this.http.post<any>(environment.rootPath + 'loginAndRegister/register', { account: this.registerAccount, password: this.registerPwdAgain }, header).subscribe((data: any) => {
              if (data.status === 'success') {
                this.ionic.Toast(data.data.msg, 'success', "top");
                // 注册成功显示登录页面
                this.isLogin = true;
              } else {
                this.ionic.Toast(data.data.msg, 'danger', "top");
              }
            }, err => {
              throw new Error(err);
            });
          } else {
            this.ionic.Toast('两次密码不一致！', 'danger', "top");
          }
        } else {
          this.ionic.Toast('手机号或密码格式有误！', 'danger', "top");
        }
      } else {
        this.ionic.Toast('请完善注册信息！', 'danger', "top");
      }
    } else {
      this.ionic.Toast("请同意爱看新闻团队协议！", "danger", "top")
    }
  }
}
