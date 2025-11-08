import Masonry from "react-masonry-css";
import EmptyState from "@/Components/ui/EmptyState";

const WajiraGallery = ({ data }) => {
  const appUrl = import.meta.env.VITE_APP_URL;

  if (!data || data.length === 0) return <EmptyState />;

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
        {data.map((gallery, index) => (
          <div
            key={index}
            className="overflow-hidden transition-all duration-300"
          >
            <img
              id={'img-' + index}
              src={`/storage/` + gallery.image}
              alt={`Wajira ${gallery.alt}`}
              className="w-full object-cover hover:scale-105 transition-transform duration-500 my-3"
            />
          </div>
        ))}
      </Masonry>
  );
};

export default WajiraGallery;
