import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import AlbumPhoto from './AlbumPhoto';
import Adapter from 'enzyme-adapter-react-16';
import { IPhoto } from '../type';
import { cleanup } from '@testing-library/react';

configure({ adapter: new Adapter() });
const mockPhotos: IPhoto[] = [
  {
    albumId: 1,
    id: 2,
    title: 'mock title',
    url: 'mock url',
    thumbnailUrl: 'mock thumbnail url',
  },
  {
    albumId: 2,
    id: 3,
    title: 'mock title 2',
    url: 'mock url 2',
    thumbnailUrl: 'mock thumbnail url 2',
  },
];
describe('AlbumPhoto', () => {
  afterEach(cleanup);
  it('should not show album photo after mount', () => {
    const component = shallow(<AlbumPhoto photos={mockPhotos} />);
    expect(component.find('.album-photo-fullsize').length).toEqual(0);
  });
  it('should show correct thumbnail', () => {
    const component = shallow(<AlbumPhoto photos={mockPhotos} />);
    expect(component.find('.album-thumbnail').at(0).prop('src')).toEqual(
      'mock thumbnail url'
    );
    expect(component.find('.album-thumbnail').at(1).prop('src')).toEqual(
      'mock thumbnail url 2'
    );
  });
  it('should show photo on thumbnail click', () => {
    const component = shallow(<AlbumPhoto photos={mockPhotos} />);
    component.find('.album-thumbnail').at(0).simulate('click');
    expect(component.find('.album-photo-fullsize').length).toEqual(1);
    expect(component.find('.album-photo-fullsize').at(0).prop('src')).toEqual(
      'mock url'
    );
  });
});
