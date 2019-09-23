import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { DataService } from 'src/app/_services/data.service';
import { User, Profile } from 'src/app/_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  readonly states: string[] = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Minor Outlying Islands', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  filteredStates: Observable<string[]>;
  private destroyed: Subject<void> = new Subject<void>();
  profileForm: FormGroup;
  loading = false;
  error = '';
  user: User = null;
  isProducer: boolean;
  isEditMode = false;

  get f (): FormGroup['controls'] { return this.profileForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private data: DataService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      shortDescription: ['', [Validators.maxLength(300)]],
      longDescription: ['', []],
      tags: ['', []],
      url: ['', []],
      street: ['', []],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      // firstName: ['', [Validators.required, Validators.maxLength(50)]],
      // lastName: ['', [Validators.required, Validators.maxLength(50)]]
    });

    this.filteredStates = this.f.state.valueChanges.pipe(
      takeUntil(this.destroyed),
      map(value => this.states.filter(state => state.toLowerCase().includes(value.toLowerCase())))
    );

    this.data.user.pipe(takeUntil(this.destroyed))
    .subscribe(
      user => {
        this.user = user;
        if (user && user.Profile) {
          if (this.router.url === '/profile') {
            this.router.navigateByUrl('/dashboard');
          }
          this.isEditMode = false;
          this.isProducer = this.user.Roles.some(role => role.Role.Name === 'producer');
          this.loading = false;
        } else if (!user) {
          this.router.navigateByUrl('/login');
        } else {
          this.isProducer = this.user.Roles.some(role => role.Role.Name === 'producer');
          this.isEditMode = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  failHandler = (error) => {
    this.loading = false;
    this.error = Object.values(error).join('\n');
  }

  cancel () {
    if (this.user.Profile && this.router.url !== '/profile') {
      this.isEditMode = false;
    }
  }

  updateProfile () {
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.updateProfile({
      AppUserId: this.user.Id,
      City: this.f.city.value,
      LongDescription: this.f.longDescription.value,
      ShortDescription: this.f.longDescription.value,
      ProfileId: (this.user.Profile && this.user.Profile.ProfileId) || 0,
      State: this.f.state.value,
      Street: this.f.street.value,
      Tags: this.f.tags.value,
      Url: this.f.url.value,
      Zip: this.f.zip.value
    } as Profile, this.failHandler);
  }
}
