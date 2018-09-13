import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie} from '../../model/movie.model';

@Component({
  selector: 'app-my-movie-list',
  templateUrl: './my-movie-list.component.html',
  styleUrls: ['./my-movie-list.component.css']
})
export class MyMovieListComponent implements OnInit {

  @Input() movies: Movie[];
  @Input() dates: Date[];

  @Output() movieRegistered = new EventEmitter<Movie>();
  @Output() movieUnregistered = new EventEmitter<Movie>();

  constructor() {
  }

   ngOnInit() {
     console.log("movie-list:movies: " + this.movies);
     
   }

  getHeight(duration: number) {
      return duration + 'px';
  }

  getPauseDuration(movie: Movie) {
    var startTime = movie.startTime;
    var index = this.movies.indexOf(movie);
    var previousMovie = index>1 ? this.movies[index-1] : this.movies[0];
    var previousEndTime = new Date(previousMovie.startTime.getTime() + previousMovie.duration*60*1000).getTime();
    var duration = (startTime.getTime() - previousEndTime) / 60000;
    return duration>0 ? duration : 0;
  }

  onRegisterMovie(movie: Movie) {
    this.movieRegistered.emit(movie);
  }

  onUnregisterMovie(movie: Movie) {
    this.movieUnregistered.emit(movie);
  }
  
}
