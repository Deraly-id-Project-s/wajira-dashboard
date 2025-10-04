import React from 'react';

const Image = ({ src, alt, className, width, height, fill, priority, ...props }) => {
  const style = fill ? { objectFit: 'cover', width: '100%', height: '100%' } : {};

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
      {...props}
    />
  );
};

export default Image;