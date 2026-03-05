import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import {TagModule} from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile',
  imports: [Card, AvatarModule, TagModule, ButtonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

}
