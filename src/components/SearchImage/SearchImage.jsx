import { Component } from 'react';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { searchImages } from 'components/Api/Api';
import Modal from 'components/Modal/Modal';
import ImageDetails from 'components/ImageDetails/ImageDetails';

class SearchImage extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    imageDetails: null,
  };

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });

      searchImages(search, page)
        .then(data =>
          this.setState(({ items }) => ({
            items: [...items, ...data.hits],
          }))
        )
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    console.log('click');
  };

  showImage = ({ largeImageURL }) => {
    this.setState({
      imageDetails: {
        largeImageURL,
      },
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      imageDetails: null,
    });
  };

  render() {
    const { items, loading, error, showModal, imageDetails } = this.state;
    const { searchImages, loadMore, showImage, closeModal } = this;

    return (
      <>
        {loading && <p>...Loading</p>}
        {error && <p>Something goes wrong</p>}
        <Searchbar onSubmit={searchImages} />
        <ImageGallery items={items} showImage={showImage} />
        {Boolean(items.length) && <button onClick={loadMore}>Load more</button>}
        {showModal && (
          <Modal close={closeModal}>
            <ImageDetails {...imageDetails} />
          </Modal>
        )}
      </>
    );
  }
}

export default SearchImage;
