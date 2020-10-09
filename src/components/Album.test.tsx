import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Album from './Album';
import Adapter from 'enzyme-adapter-react-16';
import { IAlbum, IUser, IPhoto } from '../type';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act, cleanup } from '@testing-library/react';
import AlbumPhoto from './AlbumPhoto';

const mockAlbum: IAlbum = {
  userId: 2,
  id: 1,
  title: 'mock album',
};

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

configure({ adapter: new Adapter() });
describe('Album', () => {
  afterEach(cleanup);
  it('should get from api', async () => {
    const mock = new MockAdapter(axios);
    const mockData: IPhoto[] = [
      {
        albumId: 1,
        id: 2,
        title: 'mock photo title',
        url: 'mock photo url',
        thumbnailUrl: 'mock thumbnail url',
      },
    ];
    mock
      .onGet('http://jsonplaceholder.typicode.com/photos?albumId=1')
      .reply(200, mockData);
    const component = mount(<Album album={mockAlbum} users={mockUsers} />);
    component.find('.album').at(0).simulate('click');
    await act(
      () =>
        new Promise<void>((resolve) => {
          setImmediate(() => {
            component.update();
            resolve();
          });
        })
    );
    expect(component.find('.album-thumbnail').length).toEqual(1);
    expect(component.find(AlbumPhoto).prop('photos')).toEqual(mockData);
  });
  it('should display correct album title and user', () => {
    const component = shallow(<Album album={mockAlbum} users={mockUsers} />);
    expect(component.find('.album-title').html()).toContain(
      'Title: mock album'
    );
    expect(component.find('.album-user').html()).toContain('User: mock user 2');
  });
});
