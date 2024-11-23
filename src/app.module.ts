import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { ConsultasModule } from './consultas/consultas.module';

@Module({
  imports: [
    PrismaModule,
    PacientesModule,
    MedicosModule,
    ConsultasModule,
  ],
})
export class AppModule {}
