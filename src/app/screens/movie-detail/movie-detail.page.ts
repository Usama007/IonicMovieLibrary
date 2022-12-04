import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  imgUrl = environment.imageUrl;
  id = '';
  type = '';
  detail: any = {};
  castAndCrew: any = {};
  slideOption = {
    slidesPerView: 2.5,
    freeMode: true,
  };
  isFavoite: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.getData();
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.type = params['type'];
      if (this.type === 'movie') {
        this.getMovieDetail();
      } else {
        this.getTvDetail();
      }
    });
  }

  async getData() {
    try {
      // console.log(await this.storage.get('favList'));
      await this.storage
        .get('favList')
        .then((data) => {
          const index = data?.findIndex(
            (item: any) => item?.id === this.detail?.id
          );
          if (index > -1) {
            this.isFavoite = true;
          } else {
            this.isFavoite = false;
          }
          console.log(this.isFavoite);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error('USAMA', error);
    }
  }

  async addToFavorite() {
    try {
      let storageData = await this.storage.get('favList');
      if (storageData === null) {
        await this.storage
          .set('favList', [this.detail])
          .then((data) => this.getData());
      } else {
        storageData = [...storageData, this?.detail];
        await this.storage
          .set('favList', storageData)
          .then((data) => this.getData());
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  async removeFromFavorite() {
    try {
      let storageData = await this.storage.get('favList');
      const index = storageData?.findIndex(
        (item: any) => item?.id === this.detail?.id
      );
      storageData.splice(index, 1);
      await this.storage
        .set('favList', storageData)
        .then((data) => this.getData());
    } catch (error) {
      console.error('error', error);
    }
  }

  async getMovieDetail() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
    });

    loading.present();

    this.apiService.getMovieDetail(this.id).subscribe((response: any) => {
      this.detail = response;
      this.detail['type'] = this.type;
    });
    this.apiService.getMovieCastAndCrew(this.id).subscribe((response: any) => {
      this.castAndCrew = response;
    });

    loading.dismiss();
  }
  getTvDetail() {
    this.apiService.getTvDetail(this.id).subscribe((response: any) => {
      this.detail = response;
      this.detail['type'] = this.type;
    });
    this.apiService.getTvCastAndCrew(this.id).subscribe((response: any) => {
      this.castAndCrew = response;
    });
  }
}
