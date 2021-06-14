import { Test, TestingModule } from '@nestjs/testing';
import { TrazaTicketController } from './traza-ticket.controller';
import { TrazaTicketService } from './traza-ticket.service';

describe('TrazaTicketController', () => {
  let controller: TrazaTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrazaTicketController],
      providers: [TrazaTicketService],
    }).compile();

    controller = module.get<TrazaTicketController>(TrazaTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
