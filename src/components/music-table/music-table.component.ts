import { Component, Input, SimpleChanges } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Song, SongAction } from '@/types/song.model';
import { isEqual } from 'lodash';
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
    MatSortModule,
  ],
})
export class MusicTableComponent {
  dataSource: MatTableDataSource<Song>;

  @Input() musicList: Song[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnsTranslations: string[] = [];
  @Input() actions: SongAction[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  isCustomColumn(column: string): boolean {
    switch (column) {
      case 'actions':
        return true;
      case 'rating':
        return true;
      default:
        return false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['musicList'] &&
      !isEqual(
        changes['musicList'].previousValue,
        changes['musicList'].currentValue
      )
    ) {
      this.dataSource.data = this.musicList;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
