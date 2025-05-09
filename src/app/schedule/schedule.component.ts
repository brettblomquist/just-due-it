import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { EventService, ScheduleEvent,  } from '../event.service';
import { AuthService } from '../auth.service';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  imports: [CommonModule, RouterLink, RouterModule]
})
export class ScheduleComponent implements OnInit {
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  timeSlots: string[] = [];
  //events: any[] = [];
  currentDate: Date = new Date();
  events: ScheduleEvent[]= [];

  constructor(private eventService: EventService, private authService: AuthService, private fireStore: Firestore, private router: Router){}

  ngOnInit(): void {
    this.generateTimeSlots();
    this.getEventsFromFirebase();
  }

  generateTimeSlots(): void {
    const startTime = 8;
    const endTime = 20;
    const increment = 30;
  
    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += increment) {
        const h = hour.toString().padStart(2, '0');
        const m = minute.toString().padStart(2, '0');
        this.timeSlots.push(`${h}:${m}`);
      }
    }
  }

  getEventsFromFirebase(): void{
    // const user = this.authService.getUser();
    this.authService.user$.subscribe((user) => {
    if (!user){
      return;
    }

    const userId = user.uid;
    const scheduleCollection = collection(this.fireStore, `users/${userId}/schedule`);
    collectionData(scheduleCollection, { idField: 'id'}).subscribe((data) => {
      this.events = data as ScheduleEvent[];
    })
  })
  }

  getEventsForTimeAndDay(time: string, day: string): ScheduleEvent[] {
    return this.events.filter(event =>
      event.day === day && event.startTime === time
    );
  }

  getEventsForDay(day: string): ScheduleEvent[] {
    return this.events.filter(event => event.day === day);
  }
  

  getEventStyle(event: ScheduleEvent): any {
    const [startHour, startMinute] = event.startTime.split(':').map(Number);
    const [endHour, endMinute] = event.endTime.split(':').map(Number);
    const startMinutes = (startHour * 60 + startMinute);
    const endMinutes = (endHour * 60 + endMinute);
    const durationMins = endMinutes - startMinutes;
  
    const calendarStartMinutes = 8 * 60; 

    const topOffset = (startMinutes - calendarStartMinutes) / 30 * 60 + 27; 
    // if(startHour == 8){
    //   topOffset += 27
    // }
    const height = (durationMins / 30) * 50;
  
    
    return {
      top: `${topOffset}px`,
      height: `${height}px`,
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '2px 6px',
      borderRadius: '10px',
      fontSize: '0.75rem',
      overflow: 'hidden',
      marginLeft: '4px',
      marginRight: '4px',
    };
  }

  editEvent(event: ScheduleEvent) {
    const newTitle = prompt('Edit title:', event.title);
    if (newTitle) {
      const updated = { ...event, title: newTitle };
      this.eventService.updateEvent(event, updated);
      this.events = this.eventService.getEvents();
    }
  }


  navigateToPrevWeek() {
    const currentWeekStart = this.getWeekStartDate();
    currentWeekStart.setDate(currentWeekStart.getDate() - 7);
    this.currentDate = currentWeekStart;
  }

  navigateToNextWeek() {
    const currentWeekStart = this.getWeekStartDate();
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    this.currentDate = currentWeekStart;
  }

  getWeekStartDate(): Date {
    const date = new Date(this.currentDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1); 
    date.setDate(diff);
    return date;
  }

  getWeekLabel(): string {
    const startOfWeek = this.getWeekStartDate();
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
  }


  
  getWeekEndDate(): Date {
    const startOfWeek = this.getWeekStartDate();
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return endOfWeek;
  }

  
}
