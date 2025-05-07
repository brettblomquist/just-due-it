import { Component, inject, signal } from '@angular/core';
import { EventService, ScheduleEvent} from '../event.service';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  imports: [RouterLink, FormsModule, CommonModule]
})
export class EventsComponent {
  newEvent: ScheduleEvent = {
    id: '',
    title: '',
    day: 'Mon',
    startTime: '08:00',
    endTime: '08:30',
    recurring: false,
    
  };

  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  createEvent = signal(false);

  private eventService = inject(EventService)

  events: ScheduleEvent[] = [];

  //constructor(private eventService: EventService) {}

  ngOnInit(): void {
    //this.events = this.eventService.getEvents();
    const eventsCollection = collection(this.firestore)
  }

  addEvent(): void {
    this.eventService.addEvent({ ...this.newEvent });
    this.events = this.eventService.getEvents();

    
    this.newEvent = {
      id: '',
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
