import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, RefreshCcw } from "lucide-react";
import Image from "@/Components/ui/image";
import { Button } from "./ui/button";


interface MotorcycleViewerProps {
  modelId?: string;
  initialColor?: string;
}

const MotorcycleViewer = ({
  modelId,
  initialColor = "black",
}: MotorcycleViewerProps) => {
  const [currentAngle, setCurrentAngle] = useState(34);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(80);
  const viewerRef = useRef<HTMLDivElement>(null);

  const totalAngles = 36;

  // Generate image path based on current model and angle
  const getImagePath = () => {
    const paddedAngle = currentAngle.toString().padStart(3, '0');

    switch (modelId) {
      case 'yamaha-r25':
        return `/assets/motorcycle/360/r25/${paddedAngle}.png`;
        break;
      case 'xsr-155':
        return `/assets/motorcycle/360/xsr-155/${paddedAngle}.png`;
        break;
      case 'nmax-155':
        return `/assets/motorcycle/360/nmax-turbo/${paddedAngle}.png`;
        break;
      case 'xmax-connected':
        return `/assets/motorcycle/360/xmax-connected/${paddedAngle}.png`;
        break;
      case 'lexi-lx-155':
        return `/assets/motorcycle/360/lexi-lx-155/${paddedAngle}.png`;
        break
      case 'all-new-nmax155-connected':
        return `/assets/motorcycle/360/all-new-nmax155-connected/${paddedAngle}.png`;
        break
      case 'aerox-alpha':
        return `/assets/motorcycle/360/aerox-alpha/${paddedAngle}.png`;
        break
      default:
        return `/assets/motorcycle/360/grand-filano/${paddedAngle}.png`;
    }
  };

  // Handle mouse down event to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  // Handle touch start event for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  // Handle mouse move event to rotate the motorcycle
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 10) {
      const angleChange = deltaX > 0 ? -1 : 1;
      updateAngle(angleChange);
      setStartX(e.clientX);
    }
  };

  // Handle touch move event for mobile devices
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 10) {
      const angleChange = deltaX > 0 ? -1 : 1;
      updateAngle(angleChange);
      setStartX(e.touches[0].clientX);
    }
  };

  // Update angle with boundary checks
  const updateAngle = (change: number) => {
    setCurrentAngle(prev => {
      let newAngle = prev + change;
      if (newAngle < 1) newAngle = totalAngles;
      if (newAngle > totalAngles) newAngle = 1;
      return newAngle;
    });
  };

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch end event for mobile devices
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add event listeners for mouse up and touch end outside the component
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalTouchEnd = () => setIsDragging(false);

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("touchend", handleGlobalTouchEnd);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, []);

  return (
    <section 
      className="w-full h-[800px] flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/particles/showcase-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Zoom controls */}
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

      {/* Model information */}
      <div className="absolute top-8 left-8 z-10">
        <h2 className="text-2xl font-bold">
          {modelId?.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </h2>
        <p className="text-sm text-gray-500">Angle: {currentAngle}/{totalAngles}</p>
      </div>

      {/* 3D viewer area */}
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
          <Image
            src={getImagePath()}
            alt={`${modelId} - angle ${currentAngle}`}
            className="max-w-full max-h-full object-contain select-none"
            fill
            draggable={false}
            priority
          />
        </motion.div>
      </div>
      <span className="flex flex-row gap-2 -translate-y-24">
        <RefreshCcw /> 360 Rotate
      </span>
    </section>
  );
};

export default MotorcycleViewer;