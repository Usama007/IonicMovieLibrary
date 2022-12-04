import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
  @Input() contents: any = [];
  @Input() type: String = '';
  @Output() loadMore = new EventEmitter<string>();
  @Output() navigateToDetail = new EventEmitter<object>();
  imgUrl = environment.imageUrl;
  slideOption: any = {};

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      this.slideOption.slidesPerView = this.getSidePerView();
    });
  }

  ngOnInit() {}

  loadMoreData() {
    this.loadMore.emit();
  }
  
  navigate(id: any) {
    this.navigateToDetail.emit({ id: id, type: this.type });
  }

  getSidePerView() {
    if (this.platform.width() <= 400) {
      return 2.3;
    } else if (this.platform.width() > 400 && this.platform.width() <= 750) {
      return 2.3;
    } else if (this.platform.width() > 750 && this.platform.width() <= 1200) {
      return 6.3;
    } else {
      return 10.3;
    }
  }
}
