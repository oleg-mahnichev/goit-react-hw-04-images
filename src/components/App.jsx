import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import CustomModal from './Modal/Modal';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  // Викликається при зміні значення запиту (query)
  useEffect(() => {
    if (query !== '') {
      fetchImages();
    }
  }, [query]);

  // Обробник форми для пошуку
  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setTotalImages(0);
  };

  // Запит на API
  const fetchImages = () => {
    const apiKey = '38375403-409fa10b1f66841faf3e919b8';
    setIsLoading(true);

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        if (response.data.hits.length === 0) {
          toast.error('Зображення не знайдено');
        } else {
          // Оновлення списку зображень та інших стейтів
          setImages(prevImages => [...prevImages, ...response.data.hits]);
          setPage(prevPage => prevPage + 1);
          setTotalImages(response.data.totalHits);
        }
      })
      .catch(error => {
        toast.error('Помилка завантаження зображень', error);
      })
      .finally(() => setIsLoading(false));
  };

  // Обробник кнопки "LoadMore"
  const handleLoadMore = () => {
    fetchImages();
    scrollToBottom();
  };

  // СКРОЛ до низу---ТРЕБА ДОРОБИТИ --- ПОВЕРНУТИСЬ до ЦЬОГО
  // const scrollToBottom = () => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // };

  // Обробник кліку на IMG
  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  // Обробник закриття модального вікна
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
