import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, showImage }) => {
  return (
    <>
      <ImageGalleryItem items={items} showImage={showImage} />
    </>
  );
};

export default ImageGallery;
