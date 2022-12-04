import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

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
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private loadingCtrl: LoadingController
  ) {}

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

  async getMovieDetail() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
    });

    loading.present();

    this.apiService.getMovieDetail(this.id).subscribe((response: any) => {
      this.detail = response;
    });
    this.apiService.getMovieCastAndCrew(this.id).subscribe((response: any) => {
      this.castAndCrew = response;
    });

    loading.dismiss();
  }
  getTvDetail() {
    this.apiService.getTvDetail(this.id).subscribe((response: any) => {
      this.detail = response;
    });
    this.apiService.getTvCastAndCrew(this.id).subscribe((response: any) => {
      this.castAndCrew = response;
    });
  }
}
