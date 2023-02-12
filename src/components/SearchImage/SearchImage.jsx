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

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   axios
  //     .get(
  //       'https://pixabay.com/api/?q=cat&page=1&key=32028713-8f4458935a933d773f83236cb&image_type=photo&orientation=horizontal'
  //     )
  //     .then(({ data }) => {
  //       console.log(data.hits);
  //       this.setState({ items: data.hits, loading: false });
  //     })
  //     .catch(error => {
  //       this.setState({ error: error.message });
  //     })
  //     .finally(() => {
  //       this.setState({ loading: false });
  //     });
  // }

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

  render() {
    const { items, loading, error, showModal, imageDetails } = this.state;
    const { searchImages, loadMore, showImage } = this;

    // const images = items.map(({ id, webformatURL, largeImageURL }) => {
    //   return (
    //     <li key={id} class="gallery-item">
    //       <img src={webformatURL} alt="" />
    //     </li>
    //   );
    // });

    return (
      <>
        {loading && <p>...Loading</p>}
        {error && <p>Something goes wrong</p>}
        <Searchbar onSubmit={searchImages} />
        <ImageGallery items={items} showImage={showImage} />
        {Boolean(items.length) && <button onClick={loadMore}>Load more</button>}
        {showModal && (
          <Modal>
            <ImageDetails {...imageDetails} />
          </Modal>
        )}
      </>
    );
  }
}

export default SearchImage;
