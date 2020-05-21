import { Injectable } from '@angular/core';

import * as DOMPurify from 'dompurify';

import { CustomSanitizer } from './custom-sanitizer';

@Injectable()
export class DomPurify extends CustomSanitizer {
  sanitize(source: string): string {
    const sanitizedHtml = DOMPurify.sanitize(source);
    return sanitizedHtml;
  }
}
