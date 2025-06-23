import { Component, OnInit, inject } from '@angular/core';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    //title = 'DatingApp';
  hhtp=inject(HttpClient);
  users: any;

  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.hhtp.get('https://localhost:5001/api/users').subscribe({
      next: reponse => this.users = reponse,
      error: error => console.log(error),
      complete: () => console.log('Request completed')
    })
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

}
