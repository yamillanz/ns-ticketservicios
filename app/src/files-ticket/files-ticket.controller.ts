import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesTicketService } from './files-ticket.service';
import { CreateFilesTicketDto } from './dto/create-files-ticket.dto';
import { UpdateFilesTicketDto } from './dto/update-files-ticket.dto';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files-ticket')
export class FilesTicketController {
	private log: Logger = new Logger();

	// private readonly editFileName = (req, file, callback) => {
	// 	const name = file.originalname.split('.')[0];
	// 	const fileExtName = extname(file.originalname);
	// 	const randomName = Array(4)
	// 		.fill(null)
	// 		.map(() => Math.round(Math.random() * 16).toString(16))
	// 		.join('');
	// 	callback(null, `${name}-${randomName}${fileExtName}`);
	// };

	constructor(private readonly filesTicketService: FilesTicketService) { }

	@Post()
	create(@Body() createFilesTicketDto: CreateFilesTicketDto) {
		this.log.log(`create file from ticket ${createFilesTicketDto.idTicketServicio}`)
		return this.filesTicketService.create(createFilesTicketDto);
	}

	@Get()
	findAll() {
		return this.filesTicketService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.filesTicketService.findOne(+id);
	}

	@Get('ticket/:idTicketServicio')
	findAllFromTicket(@Param('idTicketServicio') id: string) {
		this.log.log(`all files from ticket ${id}`)
		return this.filesTicketService.findAllFromTicket(+id);
	}


	//SUBIR ARCHIVOS ----------
	@Post('upload')
	@UseInterceptors(FilesInterceptor('files', 6, {
		storage: diskStorage({
			destination: process.env.FILESERVER,
			filename: (req, file, callback) => {
				const name = file.originalname.split('.')[0];
				const fileExtName = extname(file.originalname);
				const randomName = Array(32)
					.fill(null)
					.map(() => Math.round(Math.random() * 16).toString(16))
					.join('');
				callback(null, `${randomName}${fileExtName}`);
			}
		}),
	}))
	uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {

		const response = [];
		files.forEach(file => {
			const fileReponse = {
				originalname: file.originalname,
				filename: file.filename,
			};
			response.push(fileReponse);
		});
		this.log.log(`subiendo archivos ${files}`)
		return response;
	}
	//------------------------


	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFilesTicketDto: UpdateFilesTicketDto) {
		return this.filesTicketService.update(+id, updateFilesTicketDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.filesTicketService.remove(+id);
	}
}
