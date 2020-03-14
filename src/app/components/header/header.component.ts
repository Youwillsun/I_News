import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  @Input() backButton?: boolean;

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {}

  back() {
    // 如果当前路由没有上级则隐藏返回按钮['/tabs/...']
    if (this.router.url.match('/tabs')) {
      this.backButton = false;
    } else {
      history.go(-1);
    }
  }

}
