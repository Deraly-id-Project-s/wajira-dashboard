import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

const MotorcycleViewer = ({ data = [], initialColor = "black" }) => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(80);
  const viewerRef = useRef(null);

  const totalAngles = data.length;

  // Handle drag and rotate
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 10) {
      const direction = deltaX > 0 ? -1 : 1;
      updateAngle(direction);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Handle touch drag for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 10) {
      const direction = deltaX > 0 ? -1 : 1;
      updateAngle(direction);
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Update angle (loop back when end reached)
  const updateAngle = (change) => {
    setCurrentAngle((prev) => {
      let next = prev + change;
      if (next < 0) next = totalAngles - 1;
      if (next >= totalAngles) next = 0;
      return next;
    });
  };

  // Cleanup listener
  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    document.addEventListener("mouseup", handleGlobalUp);
    document.addEventListener("touchend", handleGlobalUp);
    return () => {
      document.removeEventListener("mouseup", handleGlobalUp);
      document.removeEventListener("touchend", handleGlobalUp);
    };
  }, []);

  // Fallback jika data kosong
  if (!data.length) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center text-gray-500">
        <RefreshCcw className="w-8 h-8 mb-2 animate-spin" />
        <p>Tidak ada data 360° tersedia</p>
      </div>
    );
  }

  return (
    <section
      className="w-full h-[800px] flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/particles/showcase-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Zoom Controls */}
      <div className="absolute top-8 right-8 z-10 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setZoomLevel(Math.min(zoomLevel + 10, 150))}
          className="rounded-full bg-white/90 shadow-md"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setZoomLevel(Math.max(zoomLevel - 10, 50))}
          className="rounded-full bg-white/90 shadow-md"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Info Panel */}
      <div className="absolute top-8 left-8 z-10">
        <h2 className="text-2xl font-bold">360° Viewer</h2>
        <p className="text-sm text-gray-500">
          Angle: {currentAngle + 1}/{totalAngles}
        </p>
      </div>

      {/* Viewer Area */}
      <div
        ref={viewerRef}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          animate={{ scale: zoomLevel / 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-[80%] h-[80%] flex items-center justify-center"
        >
          <img
            src={'/storage/'+data[currentAngle]}
            alt={`Angle ${currentAngle + 1}`}
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Rotate Label */}
      <span className="flex items-center gap-2 -translate-y-24 text-sm text-gray-600">
        <RefreshCcw className="w-4 h-4" /> 360 Rotate
      </span>
    </section>
  );
};

export default MotorcycleViewer;
