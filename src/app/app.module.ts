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

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: '',             component: HomeComponent },
  { 
    path: 'instructores', 
    component: InstructoresComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Instructor'] }    // solo Instructor
  },
  { path: 'cursos',       component: CursosComponent },   // todos pueden ver
  { path: 'login',        component: LoginComponent },
  { path: 'registro',     component: RegistroComponent },
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
  providers: [
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
