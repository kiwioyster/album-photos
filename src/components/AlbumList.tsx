import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Album from './Album';
import { IAlbum, IUser } from '../type';

const AlbumList: React.FC<{}> = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const ALBUMS_URL = 'http://jsonplaceholder.typicode.com/albums';
  const USERS_URL = 'http://jsonplaceholder.typicode.com/users';
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(ALBUMS_URL);
      setAlbums(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(USERS_URL);
      setUsers(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchAlbums();
    fetchUsers();
  }, []);

  return (
    <ul>
      {albums.map((album, i) => {
        return (
          <li key={i}>
            <Album album={album} users={users} />
          </li>
        );
      })}
    </ul>
  );
};

export default AlbumList;
