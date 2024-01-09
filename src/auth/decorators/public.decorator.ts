import { SetMetadata } from '@nestjs/common';
//isPublic se encuentra en SetMetadata de app.controller
export const IS_PUBLIC_KEY = 'isPublic';
//Si no encuentra la key, entonces auth is true
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
