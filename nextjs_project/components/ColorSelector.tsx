import React from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ColorOption {
  id: string;
  name: string;
  color: string;
}

interface ColorSelectorProps {
  colors?: ColorOption[];
  selectedColor?: string;
  onColorSelect?: (colorId: string) => void;
}

const ColorSelector = ({
  colors = [
    { id: "black", name: "Midnight Black", color: "#000000" },
    { id: "red", name: "Racing Red", color: "#FF0000" },
    { id: "blue", name: "Ocean Blue", color: "#0000FF" },
    { id: "silver", name: "Metallic Silver", color: "#C0C0C0" },
    { id: "white", name: "Pearl White", color: "#FFFFFF" },
  ],
  selectedColor = "black",
  onColorSelect = () => {},
}: ColorSelectorProps) => {
  return (
    <div className="flex items-center justify-center space-x-3 bg-white p-4">
      <TooltipProvider>
        {colors.map((color) => (
          <Tooltip key={color.id}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={`h-10 w-10 rounded-full p-0 ${selectedColor === color.id ? "ring-2 ring-primary ring-offset-2" : ""}`}
                style={{
                  backgroundColor: color.color,
                  borderColor:
                    color.color === "#FFFFFF" ? "#E5E5E5" : color.color,
                }}
                onClick={() => onColorSelect(color.id)}
                aria-label={`Select ${color.name} color`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{color.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default ColorSelector;