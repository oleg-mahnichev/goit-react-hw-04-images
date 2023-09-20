import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import CustomModal from './Modal/Modal';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import fetchImages from './Api/Api';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (query !== '') {
      const fetchImagesData = async () => {
        setIsLoading(true);

        try {
          const data = await fetchImages(query, page);

          if (data.hits.length === 0) {
            toast.error('Зображення не знайдено');
          } else {
            setImages(prevImages => [...prevImages, ...data.hits]);
            setTotalImages(data.totalHits);
          }
        } catch (error) {
          toast.error('Помилка завантаження зображень', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchImagesData();
    }
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setTotalImages(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Toaster />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && images.length >= 12 && !isLoading && (
        <Button
          onClick={handleLoadMore}
          disabled={isLoading}
          showLoadMoreMessage={
            images.length === 0 || images.length === totalImages
          }
        />
      )}
      <CustomModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        largeImageURL={largeImageURL}
      />
    </div>
  );
}
