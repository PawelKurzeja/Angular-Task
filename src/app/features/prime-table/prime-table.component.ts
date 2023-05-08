import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { isNotUndefined } from '../../core/utils/object';

export interface TableData {
  [key: string]: any;
}

export interface TableColumn {
  field: string;
  header: string;
}

@Component({
  selector: 'app-prime-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './prime-table.component.html',
  styleUrls: ['./prime-table.component.scss'],
})
export class PrimeTableComponent<T extends TableData> {
  @Input() data: T[] = [];

  @Input() columns: TableColumn[] = [];

  @Input() selectable = false;

  @Input() actionsEnabled = false;

  @Output() editItem = new EventEmitter<T>();

  @Output() removeItem = new EventEmitter<T>();

  @Output() selectItem = new EventEmitter<T>();

  @Output() unSelectItem = new EventEmitter<boolean>();

  onEditItem(item: T) {
    this.editItem.emit(item);
  }

  onRemoveItem(item: T) {
    this.removeItem.emit(item);
  }

  onSelectItem(item: T) {
    this.selectItem.emit(item);
  }

  onUnSelectItem() {
    this.unSelectItem.emit(true);
  }

  customSort(event: SortEvent) {
    const prop = event.field;
    const order = event.order;

    if (isNotUndefined(prop)) {
      this.data = [...this.data].sort((a, b) => {
        const value1 = a[prop];
        const value2 = b[prop];

        if (value1 === value2) {
          return 0;
        }

        const result = value1 < value2 ? -1 : 1;

        return order === 1 ? result : -result;
      });
    }
  }
}
