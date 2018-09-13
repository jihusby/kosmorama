import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {

  movies: Movie[];
  dates: Date[];
  
  constructor(private route: ActivatedRoute, private movieService: MovieService) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      var day = params.get('day');
      this.movies = this.movieService.getMyMovies(day);
      this.dates = this.movieService.getDates();
    });    
  }

  onMovieUnregistered(movie: Movie) {
    this.movieService.unregisterMovie(movie);
  }


}
