import { Module } from '@nestjs/common';
import { initAppModules } from './init/appModules';

@Module({
  imports: [...initAppModules],
})
export class AppModule {}
