import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter, MOMENT } from 'angular-calendar';
import { SchedulerModule } from 'angular-calendar-scheduler'
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {FormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { ScheduleComponent } from '../schedule/schedule.component';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory,}),
    SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange'}),
    FormsModule,
    BrowserModule,
    ScheduleComponent
  ],
  exports: [
    ScheduleComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en-US'},
    { provide: MOMENT, useValue: MOMENT }
  ]
})
export class AppModule { }
