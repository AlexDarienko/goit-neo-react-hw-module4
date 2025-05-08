import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const API_URL = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = 'xAR_LGVkKzz1Je_Kvjthfa2JM3dLdKRmXlmvV3ice9U';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL, {
          params: {
            client_id: ACCESS_KEY,
            query,
            page,
            per_page: 12,
          },
        });

        setImages(prev => [...prev, ...response.data.results]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    if (!newQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const loadMore = () => setPage(prev => prev + 1);

  const openModal = image => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setShowModal(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={loadMore} />}
      {showModal && <ImageModal image={modalImage} onClose={closeModal} />}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
