import { Component, OnInit } from '@angular/core';
import { LoadChildren, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./components/login/login.component";
import { AboutComponent } from "./components/about/about.component";
import { NavbarGenComponent } from './components/navbar-gen/navbar-gen.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, CommonModule, LoginComponent, NavbarGenComponent,  AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  title = 'frontend';

  constructor(private router: Router) {}
}