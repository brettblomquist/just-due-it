import { Component } from '@angular/core';
import { EventService, ScheduleEvent} from '../event.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  imports: [RouterLink, FormsModule, CommonModule]
})
export class EventsComponent {
  newEvent: ScheduleEvent = {
    title: '',
    day: 'Mon',
    startTime: '08:00',
    endTime: '08:30',
    recurring: false,
    
  };

  events: ScheduleEvent[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events = this.eventService.getEvents();
  }

  addEvent(): void {
    this.eventService.addEvent({ ...this.newEvent });
    this.events = this.eventService.getEvents();

    
    this.newEvent = {
      title: '',
      day: 'Mon',
      startTime: '08:00',
      endTime: '08:30',
      recurring: false
    };
  }

  deleteEvent(event: ScheduleEvent): void {
    this.eventService.deleteEvent(event);
    this.events = this.eventService.getEvents();
  }

//   editEvent(event: ScheduleEvent): void {
//     const updatedTitle = prompt('Edit title', event.title);
//     if (updatedTitle) {
//       const updatedEvent = { ...event, title: updatedTitle };
//       this.eventService.updateEvent(event, updatedEvent);
//       this.events = this.eventService.getEvents();
//     }
//   }
}
