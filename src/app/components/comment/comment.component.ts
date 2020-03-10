import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  // 存储用户的评论数据
  @Input() comment: Array<any>;

  // 存储用户写的评论内容
  public comContent: string;

  constructor(public toastController: ToastController) { }

  ngOnInit() { }

  // 发表评论
  public publishCom() {
    if (this.comContent) {
      // 获取昵称
      let nickName = window.localStorage.getItem('nickName');
      this.comment.unshift({ userId: window.localStorage.getItem('userId'), nickName: nickName === null || undefined ? '暂无' : nickName, headPhoto: "https://s2.ax1x.com/2020/03/03/34B4cF.png", content: this.comContent, like: 0 });
    } else { 
      this.presentToast();
      return false;
    }

  }

  // 点赞
  likeEvent(num: number) {
    console.log(num);
  }

  // ionic toast
  async presentToast() {
    const toast = await this.toastController.create({
      message: '不能发表空评论！',
      duration: 1000,
      position:'top',
      color:'danger'
    });
    toast.present();
  }

}
