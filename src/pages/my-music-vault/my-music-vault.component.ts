import { Component } from '@angular/core';
import { MusicTableComponent } from '@/components/music-table/music-table.component';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from '@/services/authentication.service';

@Component({
  selector: 'app-my-music-vault',
  templateUrl: './my-music-vault.component.html',
  styleUrls: ['./my-music-vault.component.scss'],
  imports: [MusicTableComponent, TranslatePipe, TranslateModule],
  standalone: true,
})
export class MyMusicVaultComponent {
  constructor(private authenticationService: AuthenticationService) {}

  openDialog() {
    // Logic to open a dialog for adding a new music item
  }

  logout() {
    this.authenticationService.logout();
  }
}
