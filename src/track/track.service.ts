import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { updateObject } from 'src/common/update.object';
import { modifyDB, addToStore } from 'src/db/modify.db';
import { findAll, findById, getAllData } from 'src/db/find.db';
import { ResponseTrackDto } from './dto/response-track.dto';

@Injectable()
export class TrackService {
  async create(createTrackDto: CreateTrackDto) {
    const id = uuidv4();

    createTrackDto.albumId &&
      (await findById('albums', createTrackDto.albumId));

    createTrackDto.artistId &&
      (await findById('artists', createTrackDto.artistId));

    const newTrack = { ...createTrackDto, id };
    await addToStore('tracks', newTrack);
    return newTrack;
  }

  async findAll() {
    const allTracks = await findAll('tracks');
    return allTracks;
  }

  async findOne(id: string) {
    const track = await findById('tracks', id);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const tracks = (await findAll('tracks')) as ResponseTrackDto[];
    const track = await findById('tracks', id);

    updateTrackDto.albumId &&
      (await findById('albums', updateTrackDto.albumId));

    updateTrackDto.artistId &&
      (await findById('artists', updateTrackDto.artistId));

    const updatedTrack = updateObject(track, updateTrackDto);
    const updatedTracks = tracks.map((track) => {
      if (track.id === id) {
        return updatedTrack;
      }
      return track;
    });

    await modifyDB({ tracks: updatedTracks });
    return updatedTrack;
  }

  async remove(id: string) {
    const { tracks, favourites } = await getAllData();
    await findById('tracks', id);
    const newTracks = tracks.filter((track) => track.id !== id);
    const newFavTracks = favourites.tracks.filter((trackId) => trackId !== id);
    favourites.tracks = newFavTracks;

    await modifyDB({ tracks: newTracks, favourites });
  }
}
