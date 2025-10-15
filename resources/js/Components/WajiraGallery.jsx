import Masonry from "react-masonry-css";

const WajiraGallery = () => {
  const images = [
    "/assets/gallery/1.png",
    "/assets/gallery/2.png",
    "/assets/gallery/3.png",
    "/assets/gallery/4.png",
    "/assets/gallery/6.png",
    "/assets/gallery/5.png",
  ];

  const breakpointColumnsObj = {
    default: 2,
    1024: 2,
    640: 1,
  };

  return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="bg-clip-padding"
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden transition-all duration-300"
          >
            <img
              src={src}
              alt={`Wajira ${index}`}
              className="w-full object-cover hover:scale-105 transition-transform duration-500 my-3"
            />
          </div>
        ))}
      </Masonry>
  );
};

export default WajiraGallery;
