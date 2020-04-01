import { Component, OnInit, Input } from '@angular/core';
import { IonicService } from 'src/app/share/service/ionic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { INEncrypt } from 'src/app/share/class/INEncrypt';

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
  // 存储用户昵称
  public nickName: string;
  // 存储用户头像
  public userPhoto: string;

  // 用户评论内容备份【点赞要用】
  public comContentBackUp: string;

  constructor(
    public ionic: IonicService,
    public http: HttpClient,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    // 获取用户id
    this.userId = INEncrypt.basicDecrypt(window.localStorage.getItem('userId'));
    // 获取newsId
    this.route.params.subscribe((data: any) => {
      this.newsId = data.id;
    });
    // 获取用户点赞的评论
    this.userLikeComment();
  }

  // 发表评论
  public publishCom() {
    // 发表评论
    if (this.comContent) {
      // 备份评论内容
      this.comContentBackUp = this.comContent;
      // 拿到用户的头像和昵称
      this.http.post(environment.rootPath + 'getUserInfo', { id: this.userId }).subscribe((data: any) => {
        if (data.status === 'success') {
          // 判断有没有昵称
          if (data.data.nickName) {
            this.nickName = data.data.nickName;
          } else {
            this.nickName = '暂无';
          }
          // 判断有没有头像
          if (data.data.userPhoto) {
            this.userPhoto = data.data.userPhoto;
          } else {
            this.userPhoto = "https://s2.ax1x.com/2020/03/03/34B4cF.png";
          }
          // 发表评论
          this.comment.unshift({ nickName: this.nickName, userPhoto: this.userPhoto, commentContent: this.comContent, commentLikeNum: 0 });
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
          this.ionic.Toast('评论失败', "danger", "top");
        }
      }, err => {
        throw new Error(err);
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
        } else { }
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
    // 判断是否为新的评论
    if (commentId) {
      // 发送
      this.likeSendMsg(commentId, iconDom, likeDom, index);
    } else {
      // 调用接口获取评论的id
      this.http.post(environment.rootPath + 'getUserThisComment', { commentUserId: this.userId, commentNewsId: this.newsId, commentContent: this.comContentBackUp }).subscribe((data: any) => {
        if (data.status === 'success') {
          commentId = data.data;
          // 发送
          this.likeSendMsg(commentId, iconDom, likeDom, index);
        } else {
          this.ionic.Toast(data.data.msg, "danger", "top");
        }
      }, err => {
        throw new Error(err);
      });
    }
  }

  /**
   * 向后台发送点赞消息
   * @param commentId 评论的id
   * @param iconDom 点赞图标的dom
   * @param likeDom 点赞数字的dom
   * @param index dom元素序号
   */
  likeSendMsg(commentId: string, iconDom: any, likeDom: any, index: number) {
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
