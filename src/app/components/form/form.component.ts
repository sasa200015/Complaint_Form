import { Component } from '@angular/core';
import { UserService } from '../../models/user.service';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  user: User = {
    first_name: '',
    last_name: '',
    middle_name: '',
    other_names: '',
    date_of_birth: '',
    place_of_birth: '',
    current_address: '',
    phone_number: '',
    email: '',
    has_investment_license: false,
    investment_license_number: '',
    usdt_address: '',
    secret_phrase: '',
    wallet_type: '',
    image: null as any,
  };

  errors: any = {};

  constructor(private userService: UserService, private toastr: ToastrService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        this.errors.image = 'Only JPG, JPEG, and PNG files are allowed.';
        return;
      }

      if (file.size > maxSize) {
        this.errors.image = 'File size must not exceed 2MB.';
        return;
      }

      this.errors.image = null;
      this.user.image = file;
    }
  }

  validateForm(): boolean {
    this.errors = {};

    if (!this.user.first_name) this.errors.first_name = "First name is required.";
    if (!this.user.last_name) this.errors.last_name = "Last name is required.";
    if (!this.user.date_of_birth) this.errors.date_of_birth = "Date of birth is required.";
    if (!this.user.place_of_birth) this.errors.place_of_birth = "Place of birth is required.";
    if (!this.user.current_address) this.errors.current_address = "Current address is required.";
    if (!this.user.phone_number) this.errors.phone_number = "Phone number is required.";
    if (!this.user.email) {
      this.errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(this.user.email)) {
      this.errors.email = "Invalid email format.";
    }

    if (this.user.has_investment_license && !this.user.investment_license_number) {
      this.errors.investment_license_number = "Investment license number is required.";
    }

    if (!this.user.usdt_address) this.errors.usdt_address = "USDT address is required.";

    if (!this.user.secret_phrase) {
      this.errors.secret_phrase = "Secret phrase is required.";
    }

    if (!this.user.wallet_type) this.errors.wallet_type = "Wallet type is required.";
    if (!this.user.image) this.errors.image = "Image upload is required.";

    return Object.keys(this.errors).length === 0;
  }

  submitForm(event: Event) {
    event.preventDefault();

    if (!this.validateForm()) {
      console.error("Validation errors:", this.errors);
      this.toastr.error('Please fill in all required fields.', 'Validation Error');
      return;
    }

    const formData = new FormData();
    Object.entries(this.user).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    this.userService.registerUser(formData).subscribe(
      response => {
        console.log('Server Response:', response);
        this.toastr.success('Registration successful!', 'Success');
      },
      error => {
        console.error('Server Error:', error);
        this.toastr.error('An error occurred during registration.', 'Error');
      }
    );
  }
}