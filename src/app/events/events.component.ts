import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  newEvent = {
    title: '',
    day: '',
    startTime: '',
    endTime: '',
    recurring: false,
  };

  ngOnInit(): void {
    this.events = JSON.parse(localStorage.getItem('events') || '[]');
  }

  addEvent() {
    if (
      !this.newEvent.title ||
      !this.newEvent.day ||
      !this.newEvent.startTime ||
      !this.newEvent.endTime
    ) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const eventToAdd = {
      ...this.newEvent,
      date: new Date(),
    };
  
    this.events.push(eventToAdd);
    this.saveEvents();
  
    this.newEvent = {
      title: '',
      day: '',
      startTime: '',
      endTime: '',
      recurring: false,
    };
  }

  editEvent(event: any) {
    const newTitle = prompt('Edit event title:', event.title);
    if (newTitle !== null) {
      event.title = newTitle;
      this.saveEvents();
    }
  }

  deleteEvent(event: any) {
    this.events = this.events.filter((e) => e !== event);
    this.saveEvents();
  }

  saveEvents() {
    localStorage.setItem('events', JSON.stringify(this.events));
  }
}
