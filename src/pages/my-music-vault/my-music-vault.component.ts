import { Component } from '@angular/core';
import { MusicTableComponent } from '@/components/music-table/music-table.component';
import {
  TranslatePipe,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '@/services/authentication.service';
import { MusicApi } from '@/api/music.api';
import { ToasterService, ToastType } from '@/services/toaster.service';
import { Song } from '@/types/song.interface';
import { GenericModalComponent } from '@/components/generic-modal/generic-modal.component';
import { AddSongFormComponent } from '@/components/add-song-form/add-song-form.component';

@Component({
  selector: 'app-my-music-vault',
  templateUrl: './my-music-vault.component.html',
  styleUrls: ['./my-music-vault.component.scss'],
  imports: [
    MusicTableComponent,
    TranslatePipe,
    TranslateModule,
    MatButtonModule,
    GenericModalComponent,
    CommonModule,
    AddSongFormComponent,
  ],
  standalone: true,
})
export class MyMusicVaultComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private musicApi: MusicApi,
    private toaster: ToasterService,
    private translate: TranslateService
  ) {}

  musicList: Song[] = [];
  isDialogOpen: boolean = false;

  get dataForTable() {
    const musicListForDataTable = this.musicList.map((song) => ({
      title: song.title,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
      mood: song.mood,
      rating: song.rating,
    }));
    const displayedColumns = Object.keys(musicListForDataTable[0] || {});
    return {
      musicList: musicListForDataTable,
      displayedColumns,
      columnsTranslations: displayedColumns.map((column) =>
        this.translate.instant(`song-${column.toLowerCase()}--label`)
      ),
    };
  }

  ngOnInit() {
    this.initMusicList();
  }

  initMusicList() {
    this.musicApi.getMusicListByUser().subscribe({
      next: (response) => {
        this.musicList = response;
      },
      error: () => {
        this.toaster.showToast('Error fetching music list', ToastType.ERROR);
      },
    });
  }

  addSong(newSong: Song) {
    this.musicApi.addSong(newSong).subscribe({
      next: () => {
        this.initMusicList;
        this.isDialogOpen = false;
        this.toaster.showToast(
          this.translate.instant('song-added--label'),
          ToastType.SUCCESS
        );
      },
      error: () => {
        this.toaster.showToast(
          this.translate.instant('song-add-error--label'),
          ToastType.ERROR
        );
      },
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  logout() {
    this.authenticationService.logout();
  }
}
