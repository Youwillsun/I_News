import { Component, OnInit, Input } from '@angular/core';
import { IonicService } from 'src/app/share/service/ionic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

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
  // 存储用户id
  public userId: string;
  // 存储新闻id
  public newsId: string;

  constructor(
    public ionic: IonicService,
    public http: HttpClient,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    // 获取用户id
    this.userId = window.localStorage.getItem('userId');
    // 获取newsId
    this.route.params.subscribe((data:any)=>{
      this.newsId = data.id;
    });
    // 获取用户点赞的评论
    this.userLikeComment();
  }

  // 发表评论
  public publishCom() {
    if (this.comContent) {
      // 获取昵称
      let nickName = window.localStorage.getItem('nickName');
      this.comment.unshift({ nickName: nickName === null || undefined ? '暂无' : nickName, userPhoto: "https://s2.ax1x.com/2020/03/03/34B4cF.png", commentContent: this.comContent, commentLikeNum: 0 });
      // 向后台发送评论数据
      this.http.post<any>(environment.rootPath + 'publishComment', { commentUserId: this.userId, commentNewsId: this.newsId, commentContent: this.comContent }).subscribe((data: any) => {
        if (data.status === 'success') {
          // 清空评论
          this.comContent = null;
          this.ionic.Toast(data.data.msg, "success", "top");
        } else {
          this.ionic.Toast(data.data.msg, "danger", "top");
        }
      });
    } else {
      this.ionic.Toast('不能发表空评论！', 'danger', 'top', 1000);
      return false;
    }
  }

  // 获取用户点赞的评论
  userLikeComment() {
    // 点赞图标的dom
    let iconDom = document.getElementsByClassName('likeIcon');
    // 调用接口
    this.http.post(environment.rootPath + 'getUserLikeComment', { userId: this.userId, newsId: this.newsId }).subscribe((data: any) => {
      if (data.status === 'success') {
        let res = data.data;
        if (res.length !== 0) {
          // 和评论数据中的id进行比对
          this.comment.forEach((el: any, index: number) => {
            res.forEach((item: any) => {
              // 如果找到了对应的id
              if (item.commentId === el.id) {
                // 改变图标
                iconDom[index].setAttribute('name', 'thumbs-up');
              }
            });
          })
        }
      } else {
        this.ionic.Toast(data.data.msg, "danger", "top");
      }
    }, err => {
      throw new Error(err);
    });
  }

  /**
   * 点赞
   * @param index 这条评论的dom序号
   * @param commentId 这条评论对应的id
   */
  likeEvent(index: number, commentId: string) {
    // 获取dom元素
    // 点赞图标的dom
    let iconDom = document.getElementsByClassName('likeIcon');
    // 点赞数字的dom
    let likeDom = document.getElementsByClassName('likeNum');
    // 如果没有对这评论点过赞
    if (iconDom[index].getAttribute('name') === 'thumbs-up-outline') {
      // 调用点赞接口
      this.http.post<any>(environment.rootPath + 'thumbUpNews', { userId: this.userId, newsId: this.newsId, commentId: commentId }).subscribe((data: any) => {
        if (data.status === 'success') {
          // 让点赞数量+1
          let num = Number(likeDom[index].innerHTML) + 1;
          iconDom[index].setAttribute('name', 'thumbs-up');
          // 设置到dom上
          likeDom[index].innerHTML = String(num);
          // 提示用户
          this.ionic.Toast(data.data.msg, "success", "top");
        } else {
          this.ionic.Toast(data.data.msg, "danger", "top");
        }
      }, err => {
        throw new Error(err);
      });
    } else {
      // 取消点赞的接口
      this.http.post<any>(environment.rootPath + 'thumbUpNews/cancelThumbUp', { userId: this.userId, newsId: this.newsId, commentId: commentId }).subscribe((data: any) => {
        if (data.status === 'success') {
          // 让点赞数量-1
          let num = Number(likeDom[index].innerHTML) - 1;
          iconDom[index].setAttribute('name', 'thumbs-up-outline');
          // 设置到dom上
          likeDom[index].innerHTML = String(num);
          // 提示用户
          this.ionic.Toast(data.data.msg, "success", "top");
        } else {
          this.ionic.Toast(data.data.msg, "danger", "top");
        }
      }, err => {
        throw new Error(err);
      });
    }
  }

}
