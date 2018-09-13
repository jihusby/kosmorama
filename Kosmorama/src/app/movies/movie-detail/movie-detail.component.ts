import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Movie } from '../../model/movie.model';
import { MovieService } from '../../service/movie.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']

})
export class MovieDetailComponent implements OnInit {

  registrations: {};

  @Input() movie: Movie;
  
  weekday: string[] = ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'];

  constructor(private movieService: MovieService) {}

  ngOnInit() {}
  
  register() {
    this.movieService.registerMovie(this.movie);
  }

  unregister() {
    this.movieService.unregisterMovie(this.movie);
 }

  isRegistered(id: number) {
    return this.movie.registered;
  }

  getTimeString() {
    var endTime = new Date(this.movie.startTime.getTime() + this.movie.duration*60*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return this.weekday[this.movie.startTime.getDay()] + ' ' + 
      this.movie.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + 
      ' - ' + 
      endTime +
      ' (' + this.movie.duration + ' min)';
  }

}
