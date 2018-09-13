import { Routes, RouterModule } from "@angular/router";
import { MoviesComponent } from "./movies/movies.component";
import { MovieDetailComponent } from "./movies/movie-detail/movie-detail.component";
import { MyMoviesComponent } from "./my-movies/my-movies.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NgModule } from "@angular/core";

const appRoutes: Routes = [
    { path: '', redirectTo: 'movies', pathMatch: 'full' },
    { path: 'movies', component: MoviesComponent },
    { path: 'movie/:id', component: MovieDetailComponent },
    { path: 'movies/:day', component: MoviesComponent },
    { path: 'mymovies', component: MyMoviesComponent },
    { path: 'mymovies/:day', component: MyMoviesComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found'}
  ];

  @NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
  })
  
export class AppRoutingModule {

}