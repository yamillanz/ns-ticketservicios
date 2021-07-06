import { Test, TestingModule } from '@nestjs/testing';
import { FilesTicketController } from './files-ticket.controller';
import { FilesTicketService } from './files-ticket.service';

describe('FilesTicketController', () => {
  let controller: FilesTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesTicketController],
      providers: [FilesTicketService],
    }).compile();

    controller = module.get<FilesTicketController>(FilesTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
