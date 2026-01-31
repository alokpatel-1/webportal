import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion'; // If available or use custom
import { RouterModule } from '@angular/router';

export type FilterType = 'checkbox' | 'range' | 'radio';

export interface FilterOption {
    label: string;
    value: any;
    count?: number; // e.g. (120)
}

export interface FilterSection {
    id: string;
    label: string;
    type: FilterType;
    options?: FilterOption[];
    rangeConfig?: {
        min: number;
        max: number;
        step?: number;
        format?: string; // e.g., currency
    };
    collapsed?: boolean;
}

@Component({
    selector: 'app-product-filter',
    standalone: true,
    imports: [CommonModule, FormsModule, SliderModule, CheckboxModule, RouterModule],
    templateUrl: './product-filter.component.html',
    styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent {
    @Input() sections: FilterSection[] = [];
    @Output() filterChange = new EventEmitter<any>(); // Emit simplified filter state

    // Internal state tracking
    selectedValues: { [key: string]: any } = {};

    toggleSection(section: FilterSection) {
        section.collapsed = !section.collapsed;
    }

    onFilterChange() {
        this.filterChange.emit(this.selectedValues);
    }
}
