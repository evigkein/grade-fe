import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'image', standalone: true })
export class ImagePipe implements PipeTransform {
  transform(src?: string): string {
    return src || '../assets/images/no-image.png';
  }
}
