import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { iRoleUpdateDTO, iUser, Role } from '../../../interfaces/i-user';
import { iPageAble } from '../../../interfaces/i-page-able';

@Component({
  selector: 'app-gestione-utenti',
  templateUrl: './gestione-utenti.component.html',
  styleUrl: './gestione-utenti.component.scss',
})
export class GestioneUtentiComponent implements OnInit {
  pageable!: iPageAble;

  currentPage: number = 0;
  currentSize: number = 12;

  userArr!: iUser[];

  listSize: number[] = [6, 12, 24, 36, 48, 60];

  roles: Role[] = [Role.ROLE_USER, Role.ROLE_ADMIN, Role.ROLE_SELLER];

  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    this.onload();
  }

  onload(): void {
    this.userSvc.getAllUsers(this.currentPage, this.currentSize).subscribe({
      next: (res) => {
        this.userArr = res.content as iUser[];
        this.pageable = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  rolesToAdd: Role[] = [];

  rolesToRemove: Role[] = [];

  editRuoli(userId: number) {
    this.userSvc
      .editRuoli(userId, this.rolesToAdd, this.rolesToRemove)
      .subscribe({
        next: (res) => {
          this.onload();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  toggleRole(role: Event) {
    const target = role.target as HTMLInputElement;
    if (target.checked) {
      if (this.rolesToRemove.includes(target.value as Role)) {
        this.rolesToRemove = this.rolesToRemove.filter(
          (role) => role !== target.value
        );
      }
      this.rolesToAdd.push(target.value as Role);
    } else {
      if (this.rolesToAdd.includes(target.value as Role)) {
        this.rolesToAdd = this.rolesToAdd.filter(
          (role) => role !== target.value
        );
      }
      this.rolesToRemove.push(target.value as Role);
    }
  }

  incrementa() {
    if (
      this.currentPage < this.pageable?.totalPages &&
      this.currentPage + 1 != this.pageable?.totalPages
    ) {
      this.currentPage++;
      this.onload();
    }
  }

  decrementa() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.onload();
    }
  }

  changeSize() {
    this.onload();
  }
}
