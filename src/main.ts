import { bootstrapApplication } from '@angular/platform-browser';
import { qrcode } from './qrcode/qrcode';

bootstrapApplication(qrcode)
  .catch((err) => console.error(err));