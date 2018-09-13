import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from '../../model/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']

})
export class MovieItemComponent implements OnInit {

  @Input() movie: Movie;
  category: string[]= ['Ramaskrik', 'Samfunn', 'Skråblikk', 'Kurdisk film', 'Dokumentar', 'Kulinarisk'];

  weekday: string[] = ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'];
  categoryColor: string[] = ['#ff88a7','#a7af28','#ffa788','#ff7700','#7700ff','#00ff77','#02f190'];
  movieId: string;
  
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.movieId = '#' + this.movie.id;
  }
  
  getMovieId() {
    return this.movieId;
  }

  getTimeString() {
    var endTime = new Date(this.movie.startTime.getTime() + this.movie.duration*60*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return this.weekday[this.movie.startTime.getDay()] + ' ' + 
      this.movie.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + 
      ' - ' + 
      endTime +
      ' (' + this.movie.duration + ' min)';
  }
  
  getColor(category: string) {
    switch(category) {
      case 'Dokumentar':
        return '#ff88a7';
      case '2':
        return '#a7ff88';
      case '3':
        return '#ffa788';
      case '4':
        return 'white';
    }
  }  

}
