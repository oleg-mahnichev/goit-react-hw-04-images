import React from 'react';
import { GalleryItem, GalleryImage } from "./ImageGalleryItem.styled"

const ImageGalleryItem = ({ image, onImageClick }) => {
    return (
        <GalleryItem className="gallery-item">
            <GalleryImage
                src={image.webformatURL}
                alt=""
                onClick={() => onImageClick(image.largeImageURL)}
            />
        </GalleryItem>
    );
};

export default ImageGalleryItem;
