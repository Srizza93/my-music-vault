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
import { SongFormComponent } from '@/components/song-form/song-form.component';
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
    SongFormComponent,
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
  isAddSongDialogOpen: boolean = false;
  isEditSongDialogOpen: boolean = false;
  songToEdit: Song | null = null;

  get dataForTable() {
    const musicListForDataTable = this.musicList.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
      mood: song.mood,
      rating: song.rating,
    }));
    const displayedColumns = Object.keys(musicListForDataTable[0] || {}).filter(
      (key) => key !== 'id'
    );

    if (!displayedColumns.includes('actions')) {
      displayedColumns.push('actions');
    }

    return {
      musicList: musicListForDataTable,
      displayedColumns,
      columnsTranslations: displayedColumns.map((column) =>
        this.translate.instant(`song-${column.toLowerCase()}--label`)
      ),
      actions: [
        {
          label: this.translate.instant('delete--label'),
          icon: 'delete',
          action: this.deleteSong.bind(this),
        },
        {
          label: this.translate.instant('edit--label'),
          icon: 'edit',
          action: this.openEditSongDialog.bind(this),
        },
      ],
    };
  }

  addSong(newSong: Song) {
    newSong.user_id = this.localStorageHelper.getItem(LOCAL_STORAGE_USER_ID);

    this.musicApi.addSong(newSong).subscribe({
      next: () => {
        this.initMusicList();
        this.closeAddSongDialog();
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

  editSong(song: Song) {
    if (!this.songToEdit?.id) {
      this.toaster.showToast(
        this.translate.instant('song-edit-error--label'),
        ToastType.ERROR
      );
      return;
    }

    this.musicApi.editSong(this.songToEdit.id, song).subscribe({
      next: () => {
        this.initMusicList();
        this.closeEditSongDialog();
        this.toaster.showToast(
          this.translate.instant('song-edited--label'),
          ToastType.SUCCESS
        );
      },
      error: () => {
        this.toaster.showToast(
          this.translate.instant('song-edit-error--label'),
          ToastType.ERROR
        );
      },
    });
  }

  deleteSong(song: Song) {
    this.musicApi.deleteSong(song.id!).subscribe({
      next: () => {
        this.initMusicList();
        this.toaster.showToast(
          this.translate.instant('song-deleted--label'),
          ToastType.SUCCESS
        );
      },
      error: () => {
        this.toaster.showToast(
          this.translate.instant('song-delete-error--label'),
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
        this.toaster.showToast(
          this.translate.instant('music-fetch-error--label'),
          ToastType.ERROR
        );
      },
    });
  }

  initDialogData() {
    if (this.genres.length === 0) {
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
    }

    if (this.moods.length === 0) {
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
  }

  openAddSongDialog() {
    this.initDialogData();
    this.isAddSongDialogOpen = true;
  }

  closeAddSongDialog() {
    this.isAddSongDialogOpen = false;
  }

  openEditSongDialog(song: Song) {
    this.initDialogData();
    this.songToEdit = song;
    this.isEditSongDialogOpen = true;
  }

  closeEditSongDialog() {
    this.songToEdit = null;
    this.isEditSongDialogOpen = false;
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit() {
    this.initMusicList();
  }
}
