import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-class-sub-news',
  templateUrl: './class-sub-news.page.html',
  styleUrls: ['./class-sub-news.page.scss'],
})
export class ClassSubNewsPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  toNewsDetail() {
    this.router.navigate(['/newsDetails']);
  }

}
