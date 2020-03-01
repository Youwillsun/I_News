import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  // 个人标签大全
  public labelArr = [
    { "tag": "运动", "color": "primary" },
    { "tag": "宅男", "color": "tertiary" },
    { "tag": "发呆", "color": "dark" },
    { "tag": "游戏", "color": "medium" },
    { "tag": "逛街", "color": "warning" },
    { "tag": "旅游", "color": "success" },
    { "tag": "玩电脑", "color": "light" },
    { "tag": "看电影", "color": "secondary" },
    { "tag": "挑战极限", "color": "danger" }
  ]

  constructor() { }
}
