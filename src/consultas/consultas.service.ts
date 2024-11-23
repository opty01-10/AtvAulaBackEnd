import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ConsultasService {
  constructor(private prisma: PrismaService) {}

  async listarTodas() {
    return this.prisma.consulta.findMany({
      include: { paciente: true, medico: true },
    });
  }

  async listarPorId(id: number) {
    return this.prisma.consulta.findUnique({
      where: { id },
      include: { paciente: true, medico: true },
    });
  }

  async criar(data: Prisma.ConsultaCreateInput) {
    // Verifica se paciente e médico existem
    const paciente = await this.prisma.paciente.findUnique({ where: { id: data.paciente.connect.id } });
    const medico = await this.prisma.medico.findUnique({ where: { id: data.medico.connect.id } });

    if (!paciente) throw new BadRequestException('Paciente não encontrado.');
    if (!medico) throw new BadRequestException('Médico não encontrado.');

    // Verifica se há conflito de horários para o mesmo paciente
    const conflitoPaciente = await this.prisma.consulta.findFirst({
      where: {
        pacienteId: data.paciente.connect.id,
        dataHora: data.dataHora,
      },
    });

    if (conflitoPaciente) throw new BadRequestException('Paciente já possui consulta nesse horário.');

    // Verifica se há conflito de horários para o mesmo médico
    const conflitoMedico = await this.prisma.consulta.findFirst({
      where: {
        medicoId: data.medico.connect.id,
        dataHora: data.dataHora,
      },
    });

    if (conflitoMedico) throw new BadRequestException('Médico já possui consulta nesse horário.');

    return this.prisma.consulta.create({ data });
  }

  async atualizar(id: number, data: Prisma.ConsultaUpdateInput) {
    return this.prisma.consulta.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return this.prisma.consulta.delete({ where: { id } });
  }
}
