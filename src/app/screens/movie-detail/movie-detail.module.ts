import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovieDetailPageRoutingModule } from './movie-detail-routing.module';
import { MovieDetailPage } from './movie-detail.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [MovieDetailPage],
})
export class MovieDetailPageModule {}
