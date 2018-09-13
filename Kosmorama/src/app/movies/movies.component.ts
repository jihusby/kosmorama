import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from '../model/movie.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  movies: Movie[];
  dates: Date[];
  day: string;
  moviesUpdated: Subscription;
  datesUpdated: Subscription;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.day = params.get('day');
      this.movies = this.movieService.getMovies(this.day);
      this.dates = this.movieService.getDates();
    });  
  
    this.moviesUpdated = this.movieService.movieListUpdated.subscribe((movies: Movie[]) => {
      this.movies = this.movieService.getMovies(this.day);
    });

    this.datesUpdated = this.movieService.dateListUpdated.subscribe((dates: Date[]) => {
      this.dates = dates;
    });

  }
  ngOnDestroy() {
    this.moviesUpdated.unsubscribe();
    this.datesUpdated.unsubscribe();
  }

}
