import { Component, Output, EventEmitter } from '@angular/core';
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
import { Song } from '@/types/song.interface';

@Component({
  selector: 'add-song-form',
  templateUrl: './add-song-form.component.html',
  styleUrls: ['./add-song-form.component.scss'],
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
export class AddSongFormComponent {
  @Output() addSongEvent = new EventEmitter<Song>();

  addSongForm: FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
  genres: string[] = [
    'Pop',
    'Rock',
    'Hip-Hop',
    'Jazz',
    'Classical',
    'Country',
    'Electronic',
    'Reggae',
    'Blues',
    'Folk',
    'R&B',
    'Metal',
    'Punk',
    'Indie',
    'Latin',
    'Gospel',
    'Soul',
    'Alternative',
    'Disco',
    'Funk',
    'Ska',
    'Grunge',
    'New Wave',
  ];
  moods: string[] = [
    'happy',
    'sad',
    'angry',
    'relaxed',
    'energetic',
    'romantic',
    'nostalgic',
  ];

  constructor(private fb: FormBuilder) {
    this.addSongForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      artist: ['', [Validators.required, Validators.maxLength(100)]],
      album: ['', [Validators.maxLength(100)]],
      genre: ['', [Validators.required, Validators.maxLength(50)]],
      mood: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            '^(happy|sad|angry|relaxed|energetic|romantic|nostalgic)$'
          ),
        ],
      ],
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
    return this.addSongForm.get('title');
  }

  get artist() {
    return this.addSongForm.get('artist');
  }

  get album() {
    return this.addSongForm.get('album');
  }

  get genre() {
    return this.addSongForm.get('genre');
  }

  get mood() {
    return this.addSongForm.get('mood');
  }

  get rating() {
    return this.addSongForm.get('rating');
  }

  onRatingChange(rating: number) {
    this.addSongForm.get('rating')?.setValue(rating);
  }

  addSong() {
    this.addSongEvent.emit(this.addSongForm.value);
  }
}
