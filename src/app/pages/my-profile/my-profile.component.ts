import { Component, OnInit } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent implements OnInit {
  user!: iUser;
  avatar!: string;
  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    this.userSvc.getByUser().subscribe((r) => {
      this.user = r;
      this.avatar = this.user.avatar || 'avatar.png';
      console.log(this.user);
    });
  }
}
