import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  toSubNews() {
    this.router.navigate(['/classSubNews'])
  }

}
