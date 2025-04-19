import { Component, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Song } from '@/types/song.model';

@Component({
  selector: 'song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    TranslateModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  standalone: true,
})
export class SongFormComponent {
  @Input() songToEdit: Song | null = null;
  @Input() genres: string[] = [];
  @Input() moods: string[] = [];
  @Input() formButtonLabel: string = '';

  @Output() songEvent = new EventEmitter<Song>();

  songForm: FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private fb: FormBuilder) {
    this.songForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      artist: ['', [Validators.required, Validators.maxLength(100)]],
      album: ['', [Validators.maxLength(100)]],
      genre: ['', [Validators.required, Validators.maxLength(50)]],
      mood: ['', [Validators.required, Validators.maxLength(50)]],
      rating: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(5),
          Validators.pattern('^[1-5]$'),
        ],
      ],
    });
  }

  get title() {
    return this.songForm.get('title');
  }

  get artist() {
    return this.songForm.get('artist');
  }

  get album() {
    return this.songForm.get('album');
  }

  get genre() {
    return this.songForm.get('genre');
  }

  get mood() {
    return this.songForm.get('mood');
  }

  get rating() {
    return this.songForm.get('rating');
  }

  ngOnInit() {
    if (this.songToEdit) {
      this.songForm.patchValue({
        title: this.songToEdit.title,
        artist: this.songToEdit.artist,
        album: this.songToEdit.album,
        genre: this.songToEdit.genre,
        mood: this.songToEdit.mood,
        rating: this.songToEdit.rating,
      });
    }
  }

  onRatingChange(rating: number) {
    this.songForm.get('rating')?.setValue(rating);
  }

  emitSongEvent() {
    this.songEvent.emit(this.songForm.value);
  }
}
