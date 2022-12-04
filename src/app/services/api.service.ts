import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTrendingMovies(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/trending/movie/day?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getPopularMovies(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getPopularTv(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/tv/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getTopRatedTv(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/tv/top_rated?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getMovieDetail(id = ''): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }
  getTvDetail(id = ''): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/tv/${id}?api_key=${environment.apiKey}`
    );
  }
  getMovieCastAndCrew(id = ''): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/movie/${id}/credits?api_key=${environment.apiKey}`
    );
  }

  getTvCastAndCrew(id = ''): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/tv/${id}/credits?api_key=${environment.apiKey}`
    );
  }
}
