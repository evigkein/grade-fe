export class EnsureModuleLoadedOnceGuard {
  constructor(targetModule: any) {
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`,
      );
    }
  }
}

// import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
// import { LocalDataService } from '@services/local-data/local-data-service';
//
// @NgModule({ providers: [LocalDataService] })
// export class LocalDataServiceModule extends ModuleLoadedOnceGuard {
//   constructor(@Optional() @SkipSelf() parentModule: LocalDataServiceModule) {
//     super(parentModule);
//   }
//
//   static forRoot(): ModuleWithProviders<LocalDataServiceModule> {
//     return {
//       ngModule: LocalDataServiceModule,
//       providers: [LocalDataService],
//     };
//   }
// }
