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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
@UseGuards(AuthGuard)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    const artist = await this.artistService.create(createArtistDto);
    return artist;
  }

  @Get()
  async findAll() {
    const artist = await this.artistService.findAll();
    return artist;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.findOne(id);
    return artist;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistService.update(id, updateArtistDto);
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.artistService.remove(id);
  }
}
