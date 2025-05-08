import { Component } from '@angular/core';
import { EventService, ScheduleEvent} from '../event.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';

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

  events: ScheduleEvent[] = [];

  constructor(private eventService: EventService, private authService: AuthService, private fireStore: Firestore, private router: Router) {}

  ngOnInit(): void {
    // this.events = this.eventService.getEvents();
    this.authService.user$.subscribe((user) => {
    if (!user) {
      return;
    }
    const userId = user.uid;
    const scheduleCollection = collection(this.fireStore, `users/${userId}/schedule`)
    collectionData(scheduleCollection, { idField: 'id' }).subscribe((data) => {
      this.events = data as ScheduleEvent[];
    })
  })
  }

  addEvent(): void {
    this.eventService.addEvent({ ...this.newEvent });
    this.events = this.eventService.getEvents();

    const user = this.authService.getUser();
    if (!user){
      return;
    }

    const userId = user.uid;

    const scheduleCollection = collection(this.fireStore, `users/${userId}/schedule`)
    addDoc(scheduleCollection, { ...this.newEvent }).then(() => 
    {
      this.events.push({...this.newEvent });
      this.newEvent = {
        title: '',
        day: 'Mon',
        startTime: '8:00',
        endTime: '8:30',
        recurring: false,
      }
    })
  }

  deleteEvent(event: ScheduleEvent): void {
    const user = this.authService.getUser();
    if (!user){
      return;
    }
    const userId = user.uid;
    const eventDocRef = doc(this.fireStore, `users/${userId}/schedule/${event.id}`)
    deleteDoc(eventDocRef).then(() => {
      this.events = this.events.filter((e) => e.id !== event.id);
    })
  }

  backToSchedule(): void {
    const user = this.authService.getUser();
    if (!user){
      return;
    }
    const userId = user.uid;
    this.router.navigate([`/schedule/${userId}`])
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
