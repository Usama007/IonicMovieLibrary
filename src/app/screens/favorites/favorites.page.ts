import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoriteList: any = [];
  imgUrl: any = environment.imageUrl;

  constructor(private storage: Storage, private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.getData();
      }
    });
  }

  ngOnInit() {}

  async getData() {
    try {
      await this.storage
        .get('favList')
        .then((data) => {
          this.favoriteList = data;
          console.log(data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error('Error', error);
    }
  }

  navigate(id: any, type: any) {
    this.router.navigate(['/movie-detail', { id: id, type: type }]);
  }
}
