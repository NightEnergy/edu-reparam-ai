import { Pipe, PipeTransform } from '@angular/core';

/** Converts a numeric grade (1-12) to a display label, e.g. 1 → "Grade 1", 12 → "Grade 12". */
@Pipe({ name: 'gradeLabel', standalone: true })
export class GradeLabelPipe implements PipeTransform {
  transform(grade: number | null | undefined): string {
    if (grade == null) return 'N/A';
    return `Grade ${grade}`;
  }
}
