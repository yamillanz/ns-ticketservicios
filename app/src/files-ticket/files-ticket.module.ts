import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { FilesTicket } from './entities/files-ticket.entity';
import { FilesTicketService } from './files-ticket.service';
import { FilesTicketController } from './files-ticket.controller';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
	imports: [
		SequelizeModule.forFeature([FilesTicket]),
		MulterModule.register({
			dest: './uploads',
		})
	],
	controllers: [FilesTicketController],
	providers: [FilesTicketService],
})
export class FilesTicketModule { }
