const EmbedMaps = ({ lat = -7.983908, lng = 112.621391, zoom = 15 }) => {
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=id&z=${zoom}&output=embed`;

  return (
    <iframe
      src={mapUrl}
      width="100%"
      height="400"
      style={{ border: 0, borderRadius: "12px" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    >asdao</iframe>
  );
};

export default EmbedMaps;
