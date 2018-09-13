import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-filter',
  templateUrl: './day-filter.component.html',
  styleUrls: ['./day-filter.component.css']
})
export class DayFilterComponent implements OnInit {

  @Input() dates: Date[];
  @Input() navigationLink: string; 
  @Input() selectedDay: number;

  weekday: string[] = ['Søn','Man','Tir','Ons','Tor','Fre','Lør'];
  
  constructor() { }

  ngOnInit() {
  }

}
