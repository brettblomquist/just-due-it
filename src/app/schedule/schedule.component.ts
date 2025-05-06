import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  imports: [CommonModule, RouterLink]
})
export class ScheduleComponent implements OnInit {
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  timeSlots: string[] = [];
  events: any[] = [];
  currentDate: Date = new Date();

  ngOnInit(): void {
    this.generateTimeSlots();
  }

  generateTimeSlots(): void {
    const startTime = 8; // 8:00 AM
    const endTime = 20; // 8:00 PM
    const increment = 30; // in minutes

    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute = 0; minute < 60; minute += increment) {
        let time = `${hour}:${minute === 0 ? '00' : minute}`;
        this.timeSlots.push(time);
      }
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
    const diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    date.setDate(diff);
    return date;
  }

  getWeekLabel(): string {
    const startOfWeek = this.getWeekStartDate();
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
  }

  getEventsForTime(time: string): any[] {
    return this.events.filter((event) => event.time === time);
  }

  addEvent(time: string, day: string) {
    const eventTitle = prompt('Enter event title:');
    const isRecurring = confirm('Is this a recurring event?');
    if (eventTitle) {
      const newEvent = {
        title: eventTitle,
        time: time,
        day: day,
        date: new Date(this.currentDate),
        recurring: isRecurring,
      };
      this.events.push(newEvent);
    }
  }

  editEvent(event: any) {
    const newTitle = prompt('Edit event title:', event.title);
    if (newTitle !== null) {
      event.title = newTitle;
    }
  }

  getWeekEndDate(): Date {
    const startOfWeek = this.getWeekStartDate();
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return endOfWeek;
  }

  getEventsForTimeAndDay(time: string, day: string): any[] {
    return this.events.filter(
      (event) =>
        event.time === time && event.day === day && event.date >= this.getWeekStartDate() && event.date <= this.getWeekEndDate()
    );
  }
}
