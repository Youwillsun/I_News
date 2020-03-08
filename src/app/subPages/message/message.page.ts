import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateMethod } from 'src/app/share/class/DateMethod';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  // 存储消息数据
  public messageData = [];

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
    // 获取数据
    this.fetchMessageData();
  }

  // 获取消息数据
  fetchMessageData() {
    this.http.get<any>("../../../assets/data/message.json").subscribe((data: any) => {
      if (data.statusText === 'OK') {
        let res = data.data;
        res.forEach((item: any) => {
          if (DateMethod.compare(item.time) === 'ok') {
            this.messageData.push(item);
          }
        });
      } else {
        throw new Error('data有误');
      }
    }, err => {
      throw new Error(err);
    });
  }

}
