"use client";

import { Slider } from "@/components/ui/slider";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AnimationControls = ({ tl, numbers }: { tl: any; numbers: any }) => {
  const [time, setTime] = useState([0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState("1");
  const setIntervalId = useRef<any>(null);

  useEffect(() => {
    const setIntervalId = setInterval(() => {
      setTime((prev) => {
        if (!isPlaying || prev[0] >= tl.duration()) {
          clearInterval(setIntervalId);
        }
        console.log(isPlaying);
        return [prev[0] + 0.1];
      });
    }, 100);
  }, [isPlaying]);

  const moveSliderForward = () => {
    setIntervalId.current = setInterval(() => {
      setTime((prev) => {
        if (!isPlaying || prev[0] >= tl.duration()) {
          clearInterval(setIntervalId.current);
        }
        return [prev[0] + 0.1];
      });
    }, 100);
  };
  // const moveSliderBackward = () => {
  //  setIntervalId.current = setInterval(() => {
  //     setTime((prev) => {
  //       if (!isPlaying || prev[0] === 0) {
  //         clearInterval(setIntervalId.current);
  //       }
  //       return [prev[0] - 0.1];
  //     });
  //   }, 100);
  // };

  return (
    <div>
      <div className="flex justify-between items-center flex-col">
        <div className="w-[100%] my-4">
          <Slider
            defaultValue={[0]}
            max={10}
            step={0.1}
            value={time}
            onValueChange={(value) => {
              tl.seek(value[0]);
              setTime(value);
            }}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              tl.play();
              setIsPlaying(true);
            }}
          >
            Play
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              tl.pause();
              setIsPlaying(false);
            }}
          >
            Pause
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              tl.reverse();
              // moveSliderBackward();
              setIsPlaying(true);
            }}
          >
            Reverse
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{speed}x</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={speed}
                onValueChange={(value) => {
                  tl.timeScale(Number(value));
                  setSpeed(value);
                }}
              >
                <DropdownMenuRadioItem value="0.25">0.25</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="0.5">0.5</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="0.75">0.75</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1.25">1.25</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1.5">1.5</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1.75">1.75</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;
