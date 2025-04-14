import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Song } from '@/types/song.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'music-table',
  templateUrl: './music-table.component.html',
  styleUrls: ['./music-table.component.scss'],
  imports: [
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    CommonModule,
    MatFormFieldModule,
    TranslatePipe,
    TranslateModule,
    MatInputModule,
    MatIconModule,
  ],
  standalone: true,
})
export class MusicTableComponent {
  @Input() musicList: Song[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnsTranslations: string[] = [];
  constructor() {}

  filterValue: string = '';

  get filteredMusicList(): Song[] {
    return this.musicList.filter((song) =>
      song.title.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }
}
