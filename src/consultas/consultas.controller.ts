import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { Prisma } from '@prisma/client';

@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Get()
  listarTodas() {
    return this.consultasService.listarTodas();
  }

  @Get(':id')
  listarPorId(@Param('id') id: string) {
    return this.consultasService.listarPorId(+id);
  }

  @Post()
  criar(@Body() data: Prisma.ConsultaCreateInput) {
    return this.consultasService.criar(data);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() data: Prisma.ConsultaUpdateInput) {
    return this.consultasService.atualizar(+id, data);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.consultasService.deletar(+id);
  }
}
