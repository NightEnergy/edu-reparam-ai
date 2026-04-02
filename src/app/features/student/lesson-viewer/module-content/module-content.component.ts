import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-module-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loading()) {
      <div class="space-y-4 animate-pulse">
        <div class="h-8 bg-gray-200 rounded-xl w-3/5"></div>
        <div class="h-4 bg-gray-200 rounded-xl w-full"></div>
        <div class="h-4 bg-gray-200 rounded-xl w-full"></div>
        <div class="h-4 bg-gray-200 rounded-xl w-4/5"></div>
      </div>
    } @else {
      <div class="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-black prose-p:text-gray-800 prose-a:text-[#0ABAB5] prose-a:font-bold prose-strong:text-black">
        <div [innerHTML]="content()"></div>
      </div>
    }
  `
})
export class ModuleContentComponent {
  content = input.required<string>();
  loading = input<boolean>(false);
}
