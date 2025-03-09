import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../models/user.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getusers().subscribe({
      next: (response) => {
        console.log('Fetched users:', response); 
        this.users = response;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
