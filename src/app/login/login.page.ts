import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public isLogin: boolean;

  constructor() { }

  ngOnInit() {
    this.isLogin = true;
  }

  // 点击注册函数
  register(){
    this.isLogin = false;
  }

  // 点击登录函数
  login(){
    this.isLogin = true;
  }

}
