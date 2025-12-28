import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-decorative-elements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decorative-elements.component.html',
  styleUrl: './decorative-elements.component.scss'
})
export class DecorativeElementsComponent {
  @Input() showFormTopCircle = false;
}

