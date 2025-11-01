const EmbedMaps = ({ lat = -7.739215821108729, lng = 110.43361038326755, zoom = 15 }) => {
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}+(Wajira+Office)&hl=id&z=${zoom}&output=embed`;

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
