import { Injectable } from '@angular/core';

export interface ScheduleEvent {
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
  private events: ScheduleEvent[] = [];

  getEvents(): ScheduleEvent[] {
    return this.events;
  }

  addEvent(event: ScheduleEvent) {
    this.events.push(event);
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

