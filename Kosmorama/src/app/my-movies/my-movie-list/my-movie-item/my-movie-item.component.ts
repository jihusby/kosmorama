import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../../../service/movie.service';
import { Movie } from '../../../model/movie.model';

@Component({
  selector: 'app-my-movie-item',
  templateUrl: './my-movie-item.component.html',
  styleUrls: ['./my-movie-item.component.css']

})
export class MyMovieItemComponent implements OnInit {

  registrations: {};

  @Input() movie: Movie;
  @Input() pauseDuration: string;
  
  constructor(private route: ActivatedRoute) { 
    
  }
  
  getColor(category: number) {
    switch(category) {
      case 1:
        return '#ff88a7';
      case 2:
        return '#a7ff88';
      case 3:
        return '#ffa788';
      case 4:
        return 'white';
    }
  }  

  getHeight(duration: number) {
    return duration + 'px';
  }

  getEndTime(movie: Movie) {
    var endTime = new Date(movie.startTime.getTime() + movie.duration*60*1000).toLocaleTimeString();
    return endTime;
  }
  
  ngOnInit() {
  }
  
  isOnMyList(id: number) {
    return this.movie.registered;
  }

  register(movie: Movie) {
    this.movie.registered = true;
  }

  unregister(movie: Movie) {
    this.movie.registered = false;
  }

}
