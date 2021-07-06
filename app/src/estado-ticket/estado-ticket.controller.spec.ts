import { Test, TestingModule } from '@nestjs/testing';
import { EstadoTicketController } from './estado-ticket.controller';
import { EstadoTicketService } from './estado-ticket.service';

describe('EstadoTicketController', () => {
  let controller: EstadoTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoTicketController],
      providers: [EstadoTicketService],
    }).compile();

    controller = module.get<EstadoTicketController>(EstadoTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
