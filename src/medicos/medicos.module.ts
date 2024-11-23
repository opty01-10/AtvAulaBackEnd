import { Module } from '@nestjs/common';
import { MedicosController } from './medicos.controller';

@Module({
  controllers: [MedicosController]
})
export class MedicosModule {}
