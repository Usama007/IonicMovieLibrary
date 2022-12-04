import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCardComponent } from 'src/app/components/image-card/image-card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ImageCardComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports:[ImageCardComponent]
})
export class SharedModule { }
