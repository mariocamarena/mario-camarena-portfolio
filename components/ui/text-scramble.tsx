'use client';
import { type JSX, useEffect, useRef, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );
  const [displayText, setDisplayText] = useState(children);
  const text = children;
  const onCompleteRef = useRef(onScrambleComplete);
  onCompleteRef.current = onScrambleComplete;

  useEffect(() => {
    if (!trigger) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayText(text);
      onCompleteRef.current?.();
      return;
    }

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        onCompleteRef.current?.();
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [trigger, text, duration, speed, characterSet]);

  return (
    <MotionComponent
      aria-label={text}
      aria-live="off"
      className={className}
      {...props}
    >
      <span aria-hidden="true">{displayText}</span>
    </MotionComponent>
  );
}
