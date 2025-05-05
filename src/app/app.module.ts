import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleModule } from './schedule/schedule.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScheduleModule,
    
  ],
  declarations: [],
  exports: [ScheduleComponent],
})
export class AppModule {}
