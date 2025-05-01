import { Component, OnInit, Inject, 
  LOCALE_ID, ViewChild, NgModule
 } from '@angular/core';
import { WeekDay, WeekView,
  WeekViewHourColumn} from 'calendar-utils';
import {CalendarView, CalendarDateFormatter, DateAdapter} from 'angular-calendar';
import {CalendarSchedulerEvent, CalendarSchedulerEventAction,
   SchedulerDateFormatter, CalendarSchedulerViewComponent, 
   SchedulerViewDay, SchedulerViewHour, DAYS_IN_WEEK, endOfPeriod, addPeriod, SchedulerViewHourSegment,
  subPeriod, startOfPeriod, SchedulerEventTimesChangedEvent} from 'angular-calendar-scheduler';
import { endOfDay, addMonths} from 'date-fns';
import { Subject, SubjectLike } from 'rxjs';
import { AppService } from '../app.service';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { CalendarModule } from 'angular-calendar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// export interface WeekViewAllDayEventResize {
//     originalOffset: number;
//     originalSpan: number;
//     edge: string;
//   }
  
//   export interface CalendarWeekViewBeforeRenderEvent extends WeekView {
//     header: WeekDay[];
//   }

@Component({
  selector: 'schedule-component', 
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  imports: [FormsModule, CommonModule, SchedulerModule],
  providers: [{
    provide: CalendarDateFormatter,
    useClass: SchedulerDateFormatter
  }],
})

export class ScheduleComponent implements OnInit {
  title = 'schedule'


  CalendarView = CalendarView;

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  viewDays: number = DAYS_IN_WEEK;
  locale: string = 'en';
  hourSegments: 1 | 2 | 4 | 6  = 2;
  weekStartsOn: number = 0;
  startsWithToday: boolean = true;
  activeDayIsOpen: boolean = true;
  excludeDays: number[] = []; // [0];
  weekendDays: number[] = [0,6];
  dayStartHour: number = 8;
  dayEndHour: number = 20;

  refresh: Subject<void> = new Subject();

  minDate: Date = new Date();
  maxDate: Date = endOfDay(addMonths(new Date(), 1));
  
  dayModifier: Function;
  hourModifier: Function;
  segmentModifier: Function;
  eventModifier: Function;

  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;

  trackByHourColumn = (index: number, column: WeekViewHourColumn) =>
    column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;

  actions: CalendarSchedulerEventAction[] = [
      {
          when: 'enabled',
          label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">cancel</i></span>',
          title: 'Delete',
          onClick: (event: CalendarSchedulerEvent): void => {
              console.log('Pressed action \'Delete\' on event ' + event.id);
          }
      },
      {
          when: 'disabled',
          label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">autorenew</i></span>',
          title: 'Restore',
          onClick: (event: CalendarSchedulerEvent): void => {
              console.log('Pressed action \'Restore\' on event ' + event.id);
          }
      }
  ];

  events!: CalendarSchedulerEvent[];

  @ViewChild(CalendarSchedulerViewComponent) calendarScheduler!: CalendarSchedulerViewComponent;
  
  constructor(@Inject(LOCALE_ID) locale: string, private appService: AppService, private dateAdapter: DateAdapter) {
    this.locale = locale;

    this.dayModifier = ((day: SchedulerViewDay): void => {
        if (!this.isDateValid(day.date)) {
            day.cssClass = 'cal-disabled';
        }
    }).bind(this);

    this.hourModifier = ((hour: SchedulerViewHour): void => {
        if (!this.isDateValid(hour.date)) {
            hour.cssClass = 'cal-disabled';
        }
    }).bind(this);

    this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
        if (!this.isDateValid(segment.date)) {
            segment.isDisabled = true;
        }
    }).bind(this);

    this.eventModifier = ((event: CalendarSchedulerEvent): void => {
        event.isDisabled = !this.isDateValid(event.start);
    }).bind(this);

    this.dateOrViewChanged();
}

ngOnInit(): void {
    this.appService.getEvents(this.actions)
        .then((events: CalendarSchedulerEvent[]) => this.events = events);
}

viewDaysOptionChanged(viewDays: number): void {
    console.log('viewDaysOptionChanged', viewDays);
    this.calendarScheduler.setViewDays(viewDays);
}

changeDate(date: Date): void {
    console.log('changeDate', date);
    this.viewDate = date;
    this.dateOrViewChanged();
}

changeView(view: CalendarView): void {
    console.log('changeView', view);
    this.view = view;
    this.dateOrViewChanged();
}

dateOrViewChanged(): void {
    if (this.startsWithToday) {
        this.prevBtnDisabled = !this.isDateValid(subPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1));
        this.nextBtnDisabled = !this.isDateValid(addPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1));
    } else {
        this.prevBtnDisabled = !this.isDateValid(endOfPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, subPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1)));
        this.nextBtnDisabled = !this.isDateValid(startOfPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, addPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1)));
    }

    if (this.viewDate < this.minDate) {
        this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
        this.changeDate(this.maxDate);
    }
}

private isDateValid(date: Date): boolean {
    return /*isToday(date) ||*/ date >= this.minDate && date <= this.maxDate;
}

viewDaysChanged(viewDays: number): void {
    console.log('viewDaysChanged', viewDays);
    this.viewDays = viewDays;
}

dayHeaderClicked(day: SchedulerViewDay): void {
    console.log('dayHeaderClicked Day', day);
}

hourClicked(hour: SchedulerViewHour): void {
    console.log('hourClicked Hour', hour);
}

segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
    console.log('segmentClicked Action', action);
    console.log('segmentClicked Segment', segment);
}

eventClicked(action: string, event: CalendarSchedulerEvent): void {
    console.log('eventClicked Action', action);
    console.log('eventClicked Event', event);
}

eventTimesChanged({ event, newStart, newEnd }: SchedulerEventTimesChangedEvent): void {
    console.log('eventTimesChanged Event', event);
    console.log('eventTimesChanged New Times', newStart, newEnd);
    let ev = this.events.find(e => e.id === event.id);
    if(ev){
      ev.start = newStart;
      ev.end = newEnd;
    }
    this.refresh.next();
}
  
}

