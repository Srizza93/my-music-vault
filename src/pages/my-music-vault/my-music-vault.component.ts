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
import { Song } from '@/types/song.model';
import { GenericModalComponent } from '@/components/generic-modal/generic-modal.component';
import { AddSongFormComponent } from '@/components/add-song-form/add-song-form.component';
import {
  LocalStorageHelper,
  LOCAL_STORAGE_USER_ID,
} from '@/helpers/local-storage.helper';
import { GenresApi } from '@/api/genres.api';
import { MoodsApi } from '@/api/moods.api';

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
    private genresApi: GenresApi,
    private moodsApi: MoodsApi,
    private toaster: ToasterService,
    private translate: TranslateService,
    private localStorageHelper: LocalStorageHelper
  ) {}

  musicList: Song[] = [];
  genres: string[] = [];
  moods: string[] = [];
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

  addSong(newSong: Song) {
    newSong.user_id = this.localStorageHelper.getItem(LOCAL_STORAGE_USER_ID);

    this.musicApi.addSong(newSong).subscribe({
      next: () => {
        this.initMusicList();
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

  initMusicList() {
    this.musicApi.getMusicListByUser().subscribe({
      next: (response) => {
        this.musicList = response;
      },
      error: () => {
        this.toaster.showToast('music-fetc-error--label', ToastType.ERROR);
      },
    });
  }

  initData() {
    this.initMusicList();

    this.genresApi.getGenres().subscribe({
      next: (response) => {
        this.genres = response.map((genre) => genre.name);
      },
      error: () => {
        this.toaster.showToast(
          this.translate.instant('genres-fetch-error--label'),
          ToastType.ERROR
        );
      },
    });

    this.moodsApi.getMoods().subscribe({
      next: (response) => {
        this.moods = response.map((mood) => mood.name);
      },
      error: () => {
        this.toaster.showToast(
          this.translate.instant('moods-fetch-error--label'),
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

  ngOnInit() {
    this.initData();
  }
}
