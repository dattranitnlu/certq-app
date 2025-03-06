import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  constructor() {}

  celebrate() {
    const duration = 2800; // in milliseconds
  
    confetti({
      particleCount: 150,
      spread: 160,
      origin: { y: 0.6 },
    });
  
    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), duration);
  }

  showAlert() {
    Swal.fire({
      title: 'Congratulation!!!',
      text: 'You have passed.',
      icon: 'success',
      timer: 4000,
      confirmButtonText: 'Cool'
    })
  }
}
