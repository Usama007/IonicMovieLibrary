import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./screens/movies/movies.module').then( m => m.MoviesPageModule)
  },
  {
    path: 'movie-detail',
    loadChildren: () => import('./screens/movie-detail/movie-detail.module').then( m => m.MovieDetailPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./screens/favorites/favorites.module').then( m => m.FavoritesPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
