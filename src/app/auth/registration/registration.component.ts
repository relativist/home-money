import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Registration');
    meta.addTags([
      {name: 'registration', content: 'register, for log in, system'},
      {name: 'description', content: 'page for registration'},
    ]);
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.required, Validators.requiredTrue])
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    this.userService.createNewUser(user)
      .subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user && user.name) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }

}
