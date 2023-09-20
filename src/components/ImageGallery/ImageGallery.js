import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from "./ImageGallery.styled"

const ImageGallery = ({ images, onImageClick }) => {
    return (
        <Gallery className="gallery">
            {images.map((image) => (
                <ImageGalleryItem
                    key={image.id}
                    image={image}
                    onImageClick={onImageClick}
                />
            ))}
        </Gallery>

    );
};

export default ImageGallery;
