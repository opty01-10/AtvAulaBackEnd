import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PacientesService {
  constructor(private prisma: PrismaService) {}

  async listarTodos() {
    return this.prisma.paciente.findMany();
  }

  async listarPorId(id: number) {
    return this.prisma.paciente.findUnique({ where: { id } });
  }

  async criar(data: Prisma.PacienteCreateInput) {
    return this.prisma.paciente.create({ data });
  }

  async atualizar(id: number, data: Prisma.PacienteUpdateInput) {
    return this.prisma.paciente.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return this.prisma.paciente.delete({ where: { id } });
  }
}
