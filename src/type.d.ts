export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}
export interface IUser {
  id: number;
  name: string;
  username: string;
  address: any;
  phone: string;
  website: string;
  company: any;
}
