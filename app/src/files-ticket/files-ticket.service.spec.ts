import { Test, TestingModule } from '@nestjs/testing';
import { FilesTicketService } from './files-ticket.service';

describe('FilesTicketService', () => {
  let service: FilesTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesTicketService],
    }).compile();

    service = module.get<FilesTicketService>(FilesTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
