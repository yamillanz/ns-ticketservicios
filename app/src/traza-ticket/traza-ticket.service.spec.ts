import { Test, TestingModule } from '@nestjs/testing';
import { TrazaTicketService } from './traza-ticket.service';

describe('TrazaTicketService', () => {
  let service: TrazaTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrazaTicketService],
    }).compile();

    service = module.get<TrazaTicketService>(TrazaTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
