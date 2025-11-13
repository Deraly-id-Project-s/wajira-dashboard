import React from "react";
import LightGallery from "lightgallery/react";
import lgVideo from "lightgallery/plugins/video";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-video.css";

const VideoPlayer = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-6 justify-between">
      {/* Kiri - 2 video vertikal */}
      <div className="flex flex-row gap-6 w-full md:w-1/2">
        {/* Video 1 */}
        <LightGallery speed={500} plugins={[lgVideo]}>
          <a
            data-lg-size="1280-720"
            data-video='{"source": [{"src":"/assets/videos/2.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}'
            data-poster="/assets/products/expeditions/truck_1.png"
            className="inline w-full"
            >
            <img
              src="/assets/products/expeditions/truck_1.png"
              alt="Video 1"
              className="h-full w-full object-cover rounded-2xl shadow-md hover:opacity-90 transition"
              />
          </a>
        </LightGallery>

        {/* Video 2 */}
        <LightGallery speed={500} plugins={[lgVideo]}>
          <a
            data-lg-size="1280-720"
            data-video='{"source": [{"src":"/assets/videos/1.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}'
            data-poster="/assets/products/expeditions/truck_2.png"
            className="inline w-full"
          >
            <img
              src="/assets/products/expeditions/truck_2.png"
              alt="Video 2"
              className="h-full w-full object-cover rounded-2xl shadow-md hover:opacity-90 transition"
            />
          </a>
        </LightGallery>
      </div>

      {/* Kanan - 1 video panjang */}
      <div className="w-full md:w-1/2">
        <LightGallery speed={500} plugins={[lgVideo]}>  
          <a
            data-lg-size="1280-720"
            data-video='{"source": [{"src":"/assets/videos/4.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}'
            data-poster="/assets/products/expeditions/truck_3.png"
            className="block h-full"
          >
            <img
              src="/assets/products/expeditions/truck_3.png"
              alt="Video 3"
              className="w-full object-cover rounded-2xl shadow-md hover:opacity-90 transition"
            />
          </a>
        </LightGallery>
      </div>
    </div>
  );
};

export default VideoPlayer;
