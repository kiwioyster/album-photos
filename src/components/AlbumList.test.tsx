import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import AlbumList from './AlbumList';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act, cleanup } from '@testing-library/react';
import { IAlbum, IUser } from '../type';
import Album from './Album';

configure({ adapter: new Adapter() });
describe('AlbumList', () => {
  afterEach(cleanup);
  it('should render', () => {
    const component = shallow(<AlbumList />);
    expect(component.getElements()).toMatchSnapshot();
  });
  it('should get from api', async () => {
    const mock = new MockAdapter(axios);
    const mockAlbums: IAlbum[] = [
      {
        userId: 1,
        id: 1,
        title: 'mock title ',
      },
      {
        userId: 1,
        id: 2,
        title: 'mock title 2',
      },
      {
        userId: 2,
        id: 3,
        title: 'mock title 3',
      },
    ];
    const mockUsers: IUser[] = [
      {
        id: 1,
        name: 'mock user',
        username: 'mock username',
        address: 'mock address',
        phone: 'mock phone',
        website: 'mock website',
        company: 'mock company',
      },
      {
        id: 2,
        name: 'mock user 2',
        username: 'mock username 2',
        address: 'mock address 2',
        phone: 'mock phone 2',
        website: 'mock website 2',
        company: 'mock company 2',
      },
    ];
    mock
      .onGet('http://jsonplaceholder.typicode.com/albums')
      .reply(200, mockAlbums);
    mock
      .onGet('http://jsonplaceholder.typicode.com/users')
      .reply(200, mockUsers);
    const component = mount(<AlbumList />);
    await act(
      () =>
        new Promise<void>((resolve) => {
          setImmediate(() => {
            component.update();
            resolve();
          });
        })
    );
    expect(component.find(Album).length).toEqual(3);
    expect(component.find(Album).at(0).prop('album')).toEqual(mockAlbums[0]);
    expect(component.find(Album).at(0).prop('users')).toEqual(mockUsers);
    expect(component.find(Album).at(1).prop('album')).toEqual(mockAlbums[1]);
    expect(component.find(Album).at(1).prop('users')).toEqual(mockUsers);
    expect(component.find(Album).at(2).prop('album')).toEqual(mockAlbums[2]);
    expect(component.find(Album).at(2).prop('users')).toEqual(mockUsers);
  });
});
