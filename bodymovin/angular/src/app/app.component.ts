import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private animationItem!: AnimationItem;

  options_bell: AnimationOptions = {
    path: '/assets/bell.json',
    loop: false,
    renderer: 'svg'
  };

  options_heart: AnimationOptions = {
    path: '/assets/heart.json',
    loop: true,
    renderer: 'svg'
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  ding() {
    this.animationItem.goToAndPlay(0)
  }

}
