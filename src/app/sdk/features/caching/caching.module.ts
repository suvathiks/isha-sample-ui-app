import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxsModule } from "@ngxs/store";
import { CacheState } from "./state/cache.state";
import { CacheInterceptor } from "./cache.interceptor";

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([CacheState])],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ]
})
export class CachingModule {}
