import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface ScheduleEvent {
  id: string;
  title: string;
  day: string;             
  startTime: string;       
  endTime: string;         
  recurring?: boolean;
  //course: string;
  //dueDate: string;
  //priority: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  //private events: ScheduleEvent[] = [];

  constructor() {}

  private firestore = inject(Firestore)
  private eventsCollection = collection(this.firestore, 'events');

  getEvents(): Observable<ScheduleEvent[]> {
    return collectionData(this.eventsCollection, ({idField: 'id'})) as Observable<ScheduleEvent[]>
  }

  addEvent(newEvent: ScheduleEvent) {
    const eventRef = doc(this.eventsCollection)
    const newId = eventRef.id;
    newEvent.id = newId;
    setDoc(eventRef, newEvent)
  }

  deleteEvent(event: ScheduleEvent) {
    this.events = this.events.filter(e => e !== event);
  }

  updateEvent(oldEvent: ScheduleEvent, updatedEvent: ScheduleEvent) {
    const index = this.events.indexOf(oldEvent);
    if (index !== -1) {
      this.events[index] = updatedEvent;
    }
  }
}

