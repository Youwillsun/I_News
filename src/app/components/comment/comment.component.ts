import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() { }

  // 发表评论
  public publishCom() {
    console.log(this.comment);
  }

}
