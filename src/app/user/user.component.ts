import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

interface User {
  id: number;
  username: string;
  fullname: string;
  email: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }


  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log("userdata",users);

    });
  }

  deleteUser(id: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
    if (id) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
      });
    }
    alert('User deleted successfully');
   this.loadUsers();
  }
}

//getUserById
  getUserById(id: number): void {
    if (id) {
      this.userService.getUserById(id).subscribe(user => {
        console.log(user);
      });
    }
  }


}

