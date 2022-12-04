import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-movies',
  templateUrl: 'movies.page.html',
  styleUrls: ['movies.page.scss'],
})
export class MoviesPage implements OnInit {
  trendingMovies: any[] = [];
  trendingMovieLoaded = false;
  trendingMoviePage = 1;

  popularMovies: any[] = [];
  popularMovieLoaded = false;
  popularMoviePage = 1;

  popularTvs: any[] = [];
  popularTvLoaded = false;
  popularTvPage = 1;

  topRatedTvs: any[] = [];
  topRatedTvLoaded = false;
  topRatedTvPage = 1;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getTrending();
    this.getPopularMovie();
    this.getPopularTv();
    this.getTopRatedTv();
  }
  loadMore(ev: any, name: any) {
    switch (name) {
      case 'trendingMovies':
        this.trendingMoviePage++;
        this.getTrending();
        break;
      case 'popularMovies':
        this.popularMoviePage++;
        this.getPopularMovie();
        break;
      case 'popularTvs':
        this.popularTvPage++;
        this.getPopularTv();
        break;
      case 'topRatedTvs':
        this.topRatedTvPage++;
        this.getTopRatedTv();
        break;
      default:
        break;
    }
  }
  navigateToDetail(param:any) {
    console.log(param);
    
    this.router.navigate(['/movie-detail',{id:param?.id,type:param?.type}])
  }
  getTrending() {
    this.apiService
      .getTrendingMovies(this.trendingMoviePage)
      .subscribe((response: any) => {
        this.trendingMovies = [...this.trendingMovies, ...response?.results];
        this.trendingMovieLoaded = true;
      });
  }
  getPopularMovie() {
    this.apiService
      .getPopularMovies(this.popularMoviePage)
      .subscribe((response: any) => {
        this.popularMovies = [...this.popularMovies, ...response?.results];
      });
  }
  getPopularTv() {
    this.apiService
      .getPopularTv(this.popularTvPage)
      .subscribe((response: any) => {
        this.popularTvs = [...this.popularTvs, ...response?.results];
        this.popularMovieLoaded = true;
      });
  }
  getTopRatedTv() {
    this.apiService
      .getTopRatedTv(this.topRatedTvPage)
      .subscribe((response: any) => {
        this.topRatedTvs = [...this.topRatedTvs, ...response?.results];
      });
  }
}
