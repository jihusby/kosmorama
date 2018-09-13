import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { MyMovieListComponent } from './my-movies/my-movie-list/my-movie-list.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import { MyMovieItemComponent } from './my-movies/my-movie-list/my-movie-item/my-movie-item.component';

import { MovieService } from './service/movie.service';

import { StorageServiceModule} from 'angular-webstorage-service';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { DayFilterComponent } from './day-filter/day-filter.component';

import { HttpClientModule } from '@angular/common/http';
import { API } from './io/api.model';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    MyMovieListComponent,
    MovieDetailComponent,
    MovieItemComponent,
    MyMovieItemComponent,
    MyMovieListComponent,
    MyMoviesComponent,
    DayFilterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    StorageServiceModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MovieService, API], 
  bootstrap: [AppComponent]
})
export class AppModule {}
