// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule }  from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }    from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';


import { HomeComponent }   from './views/home/home.component';
import { InstructoresComponent } from './views/instructores/instructores.component';
import { CursosComponent }      from './views/cursos/cursos.component';
import { LoginComponent }       from './views/auth/login/login.component';
import { RegistroComponent }    from './views/auth/registro/registro.component';
//import { EstudianteComponent } from './views/Estudiante/estudiante.component';


const routes: Routes = [
  { path: '',             component: HomeComponent },         // http://localhost:4200/
  { path: 'instructores', component: InstructoresComponent }, // /instructores
  { path: 'cursos',       component: CursosComponent },       // /cursos
  { path: 'login',        component: LoginComponent },        // /login
  { path: 'registro',     component: RegistroComponent },     // /registro
  { path: '**',           redirectTo: '' }                 
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    InstructoresComponent,
    CursosComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
     ReactiveFormsModule,
     HttpClientModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
