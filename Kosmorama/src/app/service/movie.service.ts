import { Movie} from '../model/movie.model';
import { Inject, Injectable, Component, EventEmitter, Output, OnInit } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { getDefaultService } from 'selenium-webdriver/edge';
import { assertPreviousIsParent } from '@angular/core/src/render3/instructions';
import { HttpClient } from '@angular/common/http';
import { ApiMovie } from '../model/api_movie.model';
import { ApiCategory } from '../model/api_category.model';
import { ApiRoom } from '../model/api_room.model';
import { ApiShow } from '../model/api_show.model';
import { isNgTemplate } from '@angular/compiler';
import { API } from '../io/api.model';

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MovieService {

    movieListUpdated = new Subject();
    dateListUpdated = new Subject();

    private apiMovies: ApiMovie[];
    private apiCategories: ApiCategory[];
    private apiRooms: ApiRoom[];
    private apiShows: ApiShow[];

    private movies: Movie[];
    private dates: Date[]; 

    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private client: HttpClient, private api: API) {

        this.apiMovies = [];
        this.apiCategories = [];
        this.apiRooms = [];
        this.apiShows = [];
        this.movies = [];
        this.dates = [];

        this.populateMovieListFromLocalStorage();
        this.populateMovieListFromAPI(api);
    }

    public getMovies(day: string) {
        if(isNaN(parseFloat(day)) || day == null) {
            return this.movies.sort(function(a,b){
                return a.startTime.getTime() - b.startTime.getTime();
            });
        } else {
            return this.movies.filter(
                movie => movie.startTime.getDay() == parseFloat(day))
                .sort(function(a,b){
                    return a.startTime.getTime() - b.startTime.getTime();
                });
        }
    }

    public getMyMovies(day: string) {
        if(isNaN(parseFloat(day)) || day == null) {
            return this.movies.filter(
                movie => movie.registered === true)
            .sort(function(a,b){
                return a.startTime.getTime() - b.startTime.getTime();
            });    
        } else {
            return this.movies.filter(
            movie =>    movie.startTime.getDay() == parseFloat(day) && 
                        movie.registered === true)
            .sort(function(a,b){
                return a.startTime.getTime() - b.startTime.getTime();
            });
        }
    }

    public getDates() {
        return this.dates;
    }

    public getMovieWithId(id: number) {
        var movie = this.movies.filter(function(movie) {
            return movie.id == id;
        })[0];
        return movie;
    }

    public registerMovie(movie: Movie) {
        this.movies[this.movies.indexOf(movie, 0)].registered = true;
        this.storage.set("movies", JSON.stringify(this.movies));
        this.movieListUpdated.next(this.movies);
     }

    public unregisterMovie(movie: Movie) {
        this.movies[this.movies.indexOf(movie, 0)].registered = false;
        this.storage.set("movies", JSON.stringify(this.movies));
        this.movieListUpdated.next(this.movies);
    }



/* -------------------------- Private methods -------------------------- */

    private populateMovieListFromLocalStorage() {
        console.log('MovieService: populating from local storage');
        var local = this.storage.get("movies");
        var savedMovies: Movie[]  = []
        if(local != null) {
            savedMovies = JSON.parse(local);
            savedMovies.forEach( (movie) => {
                movie.startTime = new Date(movie.startTime);
            }); 
        }
        this.publishLists(savedMovies);
    }

    private async populateMovieListFromAPI(api: API) {
        console.log('MovieService: populating from API');
        this.client.get(api.url('rooms')).subscribe(data => {
            (<ApiRoom[]>data).forEach((room, index) => {
                this.apiRooms.push(room);
            });
            this.client.get(api.url('categories')).subscribe(data => {
                (<ApiCategory[]>data).forEach((category, index) => {
                    this.apiCategories.push(category);
                });
                this.client.get(api.url('movies')).subscribe(data => {
                    (<ApiMovie[]>data).forEach((movie, index) => {
                        this.apiMovies.push(movie);
                    });
                    this.client.get(api.url('shows')).subscribe(data => {
                        (<ApiShow[]>data).forEach((show, index) => {
                            this.apiShows.push(show);
                        });
                        this.buildLocalMovieList();
                    },
                    error => {
                        console.log('Error getting Shows: ' + JSON.stringify(error));
                    });
                },
                error => {
                    console.log('Error getting Movies: ' + JSON.stringify(error));
                });
            },
            error => {
                console.log('Error getting Categories: ' + JSON.stringify(error));
            });
        },
        error => {
            console.log('Error getting Rooms: ' + JSON.stringify(error));
        });
    }


    private buildLocalMovieList() {
        var movies = [];
        this.apiShows.forEach((show, index) => {
            var movie = this.apiMovies.filter(function(movie) {
                return movie.movie_id == show.movie_id;
            })[0];
            var room = this.apiRooms.filter(function(room) {
                return room.room_id == show.room_id;
            })[0];
            var category = this.apiCategories.filter(function(category) {
                return category.category_id == movie.category_id;
            })[0];

            var registered: boolean = (
                this.getMovieWithId(show.id) != null ? this.getMovieWithId(show.id).registered : false);

            var modelMovie: Movie = new Movie(
                show.id, 
                movie.title, 
                movie.desc,
                movie.imagePath, 
                new Date(show.startTime),
                movie.duration,
                category.name,
                room.name,
                registered);
            movies.push(modelMovie);
        });

        this.publishLists(movies);
    }

    private publishLists(movies: Movie[]) {
        this.movies = movies;
        this.movies = this.movies.sort(function(a,b){
            return a.startTime.getTime() - b.startTime.getTime();
        });

        this.dates = this.generateDates(movies);

        this.storage.remove("movies");
        this.storage.set("movies", JSON.stringify(this.movies));

        this.movieListUpdated.next(this.movies);
        this.dateListUpdated.next(this.dates);
    }

    private generateDates(movies: Movie[]) {
        var dates = [];
        if(movies.length > 0) {
            let previousDay = movies[0].startTime.getDay();
            dates.push(movies[0].startTime);
            for(let movie of movies) {
                if(movie.startTime.getDay() != previousDay) dates.push(movie.startTime);
                previousDay = movie.startTime.getDay();
            }
        }
        return dates;
    }

}
