import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iUser, Role } from '../../interfaces/i-user';
import { UserService } from '../../services/user.service';
import { TicketService } from '../../services/ticket.service';
import { iTicketDTO } from '../../interfaces/i-ticket';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent implements OnInit {
  user!: iUser;
  avatar!: string;
  profileForm!: FormGroup;

  formTicket!: FormGroup;

  isSeller: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private userSvc: UserService,
    private fb: FormBuilder,
    private ticketSvc: TicketService
  ) {}

  ngOnInit(): void {
    this.reloadUser();

    this.formTicket = this.fb.group({
      object: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  reloadUser(): void {
    this.userSvc.getByUser().subscribe((r) => {
      if (!r) return;
      if (
        r.roles.includes(Role.ROLE_ADMIN) ||
        r.roles.includes(Role.ROLE_SELLER)
      ) {
        this.isSeller = true;
      }
      if (r.roles.includes(Role.ROLE_ADMIN)) {
        this.isAdmin = true;
      }
      this.user = r;
      this.avatar = this.user.avatar || 'avatar.png';
      this.initForm();
    });
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      nome: [this.user.nome, Validators.required],
      cognome: [this.user.cognome, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.userSvc.updateUser(this.profileForm.value).subscribe((response) => {
        // console.log('User aggiornato con successo!', response);
      });
    }
    setTimeout(() => {
      this.reloadUser();
    }, 2500);
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateAvatar() {
    if (!this.selectedFile) {
      return;
    }
    this.userSvc.updateAvatar(this.selectedFile).subscribe((response) => {
      // console.log('Avatar aggiornato con successo!', response);
    });
    setTimeout(() => {
      this.reloadUser();
    }, 2500);
  }

  createTicket() {
    const ticketDTO: iTicketDTO = {
      object: this.formTicket.value.object,
      description: this.formTicket.value.description,
    };
    this.ticketSvc.createTicket(ticketDTO).subscribe({
      next: (res) => {
        // console.log('Ticket creato con successo!');
      },
      error: (err) => {
        console.error('Errore nella creazione del ticket', err);
      },
    });
  }
}
