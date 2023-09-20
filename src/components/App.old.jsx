import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import CustomModal from './Modal/Modal'; // Імпортуємо компонент Modal
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: '', // Додаємо стан для URL великого зображення
    totalImages: 0, // Оголошуємо totalImages
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1, totalImages: 0 }); // Скидаємо totalImages при новому пошуковому запиті
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const apiKey = '38375403-409fa10b1f66841faf3e919b8';
    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        if (response.data.hits.length === 0) {
          // Повертаємо помилку, якщо результатів немає
          toast.error('Зображення не знайдено');
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
            page: prevState.page + 1,
            totalImages: response.data.totalHits, // Встановлюємо totalImages при завантаженні даних
          }));
        }
      })
      .catch(error => {
        toast.error('Помилка завантаження зображень', error);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleLoadMore = () => {
    this.fetchImages();
    console.log('handleLoadMore called');
    this.scrollToBottom();
  };

  scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  handleImageClick = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, totalImages } =
      this.state;

    return (
      <div className="App">
        <Toaster />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && images.length >= 12 && !isLoading && (
          <Button
            onClick={this.handleLoadMore}
            disabled={isLoading}
            showLoadMoreMessage={
              images.length === 0 || images.length === totalImages
            }
          />
        )}
        <CustomModal
          isOpen={showModal}
          onRequestClose={this.handleCloseModal}
          largeImageURL={largeImageURL}
        />
      </div>
    );
  }
}
