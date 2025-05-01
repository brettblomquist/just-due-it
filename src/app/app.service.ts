import { Injectable } from '@angular/core';
import { CalendarSchedulerEvent } from 'angular-calendar-scheduler';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  getEvents(actions: any): Promise<CalendarSchedulerEvent[]> {
    
    const mockEvents: CalendarSchedulerEvent[] = [
      {
        id: '1',
        start: new Date(),
        end: new Date(new Date().getTime() + 60 * 60 * 1000),
        title: 'Test Event',
        color: { primary: '#1e90ff', secondary: '#D1E8FF' },
        actions,
      }
    ];
    return Promise.resolve(mockEvents);
  }
  constructor() { }
}
