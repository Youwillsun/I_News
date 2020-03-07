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

  /**
   * 个人标签匹配函数
   * @param str 用户传过来的个性标签字符串 '运动,看电影'
   */
  public matchLabel(str: string) {
    // 定义数组，拼接成labelArr形式
    let labelResult = [];
    if (str.length !== 0) {
      // 把字符串分割成数组
      let label = str.split(',');
      label.forEach((item: string, index: number) => {
        this.labelArr.forEach((el: any) => {
          if (item === el.tag) {
            labelResult.push(el);
          }
        });
      });
      return labelResult;
    } else {
      return labelResult;
    }
  }
}
