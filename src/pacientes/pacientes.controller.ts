import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { Prisma } from '@prisma/client';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  listarTodos() {
    return this.pacientesService.listarTodos();
  }

  @Get(':id')
  listarPorId(@Param('id') id: string) {
    return this.pacientesService.listarPorId(+id);
  }

  @Post()
  criar(@Body() data: Prisma.PacienteCreateInput) {
    return this.pacientesService.criar(data);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() data: Prisma.PacienteUpdateInput) {
    return this.pacientesService.atualizar(+id, data);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.pacientesService.deletar(+id);
  }
}
