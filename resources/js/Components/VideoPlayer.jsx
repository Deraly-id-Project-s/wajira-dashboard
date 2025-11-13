import React from "react";
import LightGallery from "lightgallery/react";
import lgVideo from "lightgallery/plugins/video";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-video.css";

const VideoPlayer = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full md:max-w-7xl px-0">
      <div className="flex flex-row min-w-[40%] gap-6 px-[10px]">
        <LightGallery speed={500} plugins={[lgVideo]}>
          <a
            data-lg-size="1280-720"
            data-video='{"source":[{"src":"/assets/videos/2.mp4","type":"video/mp4"}],"attributes":{"preload":false,"controls":true}}'
            data-poster="/assets/products/expeditions/truck_1.png"
            className="block h-[27rem]"
          >
            <img
              src="/assets/products/expeditions/truck_1.png"
              alt="Wajira Truck - Heavy Duty Cargo Transport"
              className="w-full h-full object-cover rounded-2xl shadow-md hover:opacity-90 transition"
            />
          </a>
        </LightGallery>

        <LightGallery speed={500} plugins={[lgVideo]}>
          <a
            data-lg-size="1280-720"
            data-video='{"source":[{"src":"/assets/videos/1.mp4","type":"video/mp4"}],"attributes":{"preload":false,"controls":true}}'
            data-poster="/assets/products/expeditions/truck_2.png"
            className="block h-[27rem]"
          >
            <img
              src="/assets/products/expeditions/truck_2.png"
              alt="Wajira Truck - view"
              className="w-full h-full object-cover rounded-2xl shadow-md hover:opacity-90 transition"
            />
          </a>
        </LightGallery>
      </div>

      <div className="flex w-full px-[10px]">
        <LightGallery speed={500} plugins={[lgVideo]}>
          <a
            data-lg-size="1280-720"
            data-video='{"source":[{"src":"/assets/videos/4.mp4","type":"video/mp4"}],"attributes":{"preload":false,"controls":true}}'
            data-poster="/assets/products/expeditions/truck_3.png"
            className="block h-[27rem]"
          >
            <img
              src="/assets/products/expeditions/truck_3.png"
              alt="Wajira Truck - Extended View"
              className="w-full h-full object-cover rounded-2xl shadow-md hover:opacity-90 transition"
            />
          </a>
        </LightGallery>
      </div>
    </div>
  );
};

export default VideoPlayer;
