import React, { useEffect, useRef, useState } from 'react';

interface IJumpingLettersEffect {
  text: string;
  waveDuration?: number;
  waveDelay?: number;
  lettersConnectivity?: number;
}

export function JumpingLettersEffect({ text, waveDuration = 3000, waveDelay = 1000, lettersConnectivity = 1 }: IJumpingLettersEffect) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const numLetters = text.length;
    const jumpDuration = 100;
    const totalDuration = numLetters * jumpDuration;

    const animate = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % numLetters);
      }, jumpDuration);
    };

    const delayBeforeStart = setTimeout(() => {
      animate();
    }, waveDelay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      clearTimeout(delayBeforeStart);
    };
  }, [text, waveDelay]);

  const getLetterStyle = (index: number) => {
    const isActive = (i: number) => {
      const distance = Math.abs(i - activeIndex);
      return distance <= lettersConnectivity;
    };

    const animationDelay = (index - activeIndex + text.length) % text.length * 200;
    const transformValue = isActive(index) ? (index === activeIndex ? '-6px' : '-2px') : '0px';

    return {
      color: isActive(index) ? 'white' : '#AAA',
      transform: `translateY(${transformValue})`,
      transition: `all 200ms ease`,
      animationDelay: `${animationDelay}ms`
    };
  };

  return (
    <p
      style={{
        margin: 0,
        fontSize: '1.5em',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        letterSpacing: '0.05em',
        }}>
      {text.split('').map((char, index) => (
        <span key={index} style={getLetterStyle(index)}>
          {char}
        </span>
      ))}
    </p>
  );
}
