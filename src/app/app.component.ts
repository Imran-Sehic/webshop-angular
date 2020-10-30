import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webshop';

  constructor(private router: Router){}

  goToCreateProduct() {
    this.router.navigateByUrl('create-product')
  }

  goToHome() {
    this.router.navigateByUrl('')
  }

}
