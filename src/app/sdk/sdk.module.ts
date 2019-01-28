import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from './features/api/api.module';
import { CachingModule } from './features/caching/caching.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    CachingModule
  ]
})
export class SdkModule { }
