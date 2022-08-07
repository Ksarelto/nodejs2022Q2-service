import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/authGuard';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
@UseGuards(AuthGuard)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.albumService.create(createAlbumDto);
    return newAlbum;
  }

  @Get()
  async findAll() {
    const albums = await this.albumService.findAll();
    return albums;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.findOne(id);
    return album;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumService.update(id, updateAlbumDto);
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.albumService.remove(id);
  }
}
