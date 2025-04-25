import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MbscCalendarEvent, MbscEventcalendarOptions, Notifications, setOptions } from '@mobiscroll/angular';

setOptions({
  theme: 'windows',
  themeVariant: 'dark',
});

@Component({
  selector: 'app-schedule', 
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  providers: [Notifications],
  standalone: false,
})
export class ScheduleComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private notify: Notifications,
  ) {}

  myEvents: MbscCalendarEvent[] = [];

  eventSettings: MbscEventcalendarOptions = {
    clickToCreate: true,
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    eventDelete: true,
    view: {
      schedule: { type: 'week' },
    },
    onEventClick: (args) => {
      this.notify.toast({
        message: args.event.title,
      });
    },
  };

  ngOnInit(): void {
    this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
      this.myEvents = resp;
    });
  }
}

