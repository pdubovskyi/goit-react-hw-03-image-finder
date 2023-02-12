import styles from "./image-gallery.module.css"

const ImageGalleryItem = ({ items, showImage }) => {
  const images = items.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <li
        onClick={() => showImage({ largeImageURL })}
        key={id}
        class="gallery-item"
      >
        <img src={webformatURL} alt="" />
      </li>
    );
  });

  return <ul className={styles.gallery}>{images}</ul>;
};

ImageGalleryItem.defaultProps = {
  items: [],
};

export default ImageGalleryItem;
