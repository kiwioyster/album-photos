import React, { useState } from 'react';
import { IPhoto } from '../type';

interface Props {
  photos: IPhoto[];
}

const AlbumPhoto: React.FC<Props> = ({ photos }) => {
  const [shownPhoto, setShownPhoto] = useState<number>();
  const clickThumbnail = (id: number) => {
    setShownPhoto(id);
  };
  return (
    <>
      {photos?.map((photo) => {
        return (
          <div key={photo.id}>
            <img
              className='album-thumbnail'
              src={photo.thumbnailUrl}
              onClick={() => clickThumbnail(photo.id)}
              alt='album thumbnail'
            ></img>
            {(() => {
              if (shownPhoto === photo.id) {
                return (
                  <img
                    className='album-photo-fullsize'
                    alt='album fullsize'
                    src={photos.find((photo) => photo.id === shownPhoto)?.url}
                  ></img>
                );
              }
            })()}
          </div>
        );
      })}
    </>
  );
};

export default AlbumPhoto;
