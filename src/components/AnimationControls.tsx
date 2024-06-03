"use client";

import { Slider } from "@/components/ui/slider";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import useInterval from "./useInterval";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AnimationControls = ({
  tl,
  numbers,
  numRefs,
  AnimatingFunction,
}: {
  tl: any;
  numbers: any;
  numRefs: any;
  AnimatingFunction: any;
}) => {
  const [properties, setProperties] = useState({
    time: [0],
    isPlaying: false,
    speed: "1",
  });
  const a = useRef(0);
  useEffect(() => {
    if (a.current === 1) {
      AnimatingFunction(tl, numbers, numRefs);
    }
  }, [a.current]);

  useInterval(
    () => {
      setProperties((prev) => {
        if (prev.time[0] <= tl.duration()) {
          if (prev.isPlaying) return { ...prev, time: [prev.time[0] + 0.1] };
          else return { ...prev };
        } else return { ...prev };
      });
    },
    properties.isPlaying ? 100 : null
  );

  useEffect(() => {
    setProperties({...properties, time: [0]})
    a.current=0;
  },[numbers])

  useEffect(() => {
    tl.timeScale(Number(properties.speed));
    if (properties.isPlaying) {
      tl.play();
      if (a.current === 0) a.current = 1;
    } else {
      tl.pause();
    }
  }, [properties]);

  return (
    <div>
      <div className="flex justify-between items-center flex-col">
        <div className="w-[100%] my-4 flex flex-col">
          <Slider
            defaultValue={[0]}
            max={tl.duration()}
            step={0.1}
            value={properties.time}
            onValueChange={(value) => {
              setProperties({ ...properties, time: value });
              tl.seek(value[0]);
            }}
          />
          <div>
            {Math.floor(properties.time[0])}/{Math.floor(tl.duration())}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              setProperties({
                ...properties,
                isPlaying: true,
              })
            }
          >
            Play
          </Button>
          <Button
            variant="outline"
            onClick={() => setProperties({ ...properties, isPlaying: false })}
          >
            Pause
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{properties.speed}x</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={properties.speed}
                onValueChange={(value) =>
                  setProperties({ ...properties, speed: value })
                }
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
