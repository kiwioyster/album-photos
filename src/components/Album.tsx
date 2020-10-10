import React, { useState } from 'react';
import axios from 'axios';
import AlbumPhoto from './AlbumPhoto';
import { IAlbum, IUser, IPhoto } from '../type';

interface Props {
  album: IAlbum;
  users: IUser[];
}

const Album: React.FC<Props> = ({ album, users }) => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const PHOTO_URL = 'http://jsonplaceholder.typicode.com/photos';
  const fetchPhoto = async (albumId: number) => {
    try {
      const response = await axios.get<IPhoto[]>(
        `${PHOTO_URL}?albumId=${albumId}`
      );
      setPhotos(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  const clickedAlbum = (id: number) => {
    fetchPhoto(id);
  };
  return (
    <div className='album' onClick={() => clickedAlbum(album.id)}>
      <div className='album-title'>Title: {album.title}</div>
      <div className='album-user'>
        User: {users.find((user) => user.id === album.userId)?.name}
      </div>
      <AlbumPhoto photos={photos} />
    </div>
  );
};

export default Album;
