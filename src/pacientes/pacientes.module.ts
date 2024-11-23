import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';

@Module({
  providers: [PacientesService],
  controllers: [PacientesController]
})
export class PacientesModule {}
