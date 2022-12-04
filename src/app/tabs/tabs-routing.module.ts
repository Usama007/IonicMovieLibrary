import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'movies',
        loadChildren: () =>
          import('../screens/movies/movies.module').then(
            (m) => m.MoviesPageModule
          ),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('../screens/favorites/favorites.module').then(
            (m) => m.FavoritesPageModule
          ),
      },

      {
        path: '',
        redirectTo: '/tabs/movies',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/movies',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
