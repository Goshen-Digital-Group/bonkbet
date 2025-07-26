import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 32px auto;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  background: #fff;
`;

const Slide = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? "flex" : "none")};
  position: relative;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
  transition: opacity 0.5s;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  z-index: 0;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 2;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  margin: 0 6px;
  border: none;
  background: ${(props) => (props.active ? "#ff9900" : "#ddd")};
  cursor: pointer;
  transition: background 0.3s;
`;

const SlideButton = styled.a`
  position: absolute;
  left: 50%;
  bottom: 56px; // 20px (dots) + 36px (button height)
  transform: translateX(-50%);
  z-index: 2;
  padding: 8px 16px;
  background: #ff9900;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
  &:hover {
    background: #fdc97a;
    color: #222;
  }
`;

type SlideType = {
  image: string;
  buttonText: string;
  buttonLink: string;
};

const slides: SlideType[] = [
  {
    image: "https://placehold.co/400x180/orange/white?text=Bonk+Casino+1",
    buttonText: "Play Now",
    buttonLink: "https://v2.gamba.so/",
  },
  {
    image: "https://placehold.co/400x180/pink/white?text=Bonk+Casino+2",
    buttonText: "Join Community",
    buttonLink: "https://discord.gg/HSTtFFwR",
  },
  {
    image: "https://placehold.co/400x180/blue/white?text=Bonk+Casino+3",
    buttonText: "Read Docs",
    buttonLink: "https://docs.gamba.so/",
  },
];

const ArrowButton = styled.button<{ left?: boolean; right?: boolean }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? "left: 16px;" : "")}
  ${(props) => (props.right ? "right: 16px;" : "")}
  transform: translateY(-50%);
  background: none;
  color: #ff9900;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: color 0.2s;
  &:hover {
    color: #fdc97a;
    background: none;
  }
`;

export function ImageCarousel({ delay = 3000 }: { delay?: number }) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, delay);
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [current, delay]);

  const goToPrev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <CarouselWrapper>
      <ArrowButton left onClick={goToPrev} aria-label="Previous Slide">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ArrowButton>
      <ArrowButton right onClick={goToNext} aria-label="Next Slide">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ArrowButton>
      {slides.map((slide, idx) => (
        <Slide key={idx} active={idx === current}>
          <Image src={slide.image} alt={`Slide ${idx + 1}`} />
          <SlideButton
            href={slide.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {slide.buttonText}
          </SlideButton>
        </Slide>
      ))}
      <Dots>
        {slides.map((_, idx) => (
          <Dot
            key={idx}
            active={idx === current}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </Dots>
    </CarouselWrapper>
  );
}
