import React, { useEffect, useState, useRef } from 'react';
import GearIcon from '@/assets/images/gear.svg';

interface GearProps {
    position: 'left' | 'right';
    size: number;
    color: string;
    offset?: number;
    rotationMultiplier?: number;
}

const Gear: React.FC<GearProps> = ({
    position,
    size,
    color,
    offset = 0,
    rotationMultiplier = 1
}) => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setRotation(scrollPosition * 0.1 * rotationMultiplier);
        };

        // Use passive: true for better scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initialize rotation based on current scroll

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [rotationMultiplier]);

    return (
        <div
            className={`fixed top-1/2 ${position === 'left' ? 'left-0' : position === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 pointer-events-none z-[0]`}
            style={{
                transform: `translateY(${offset}px)`,
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 50 50"
                className="opacity-15 hover:opacity-60 transition-opacity duration-300"
                style={{
                    transform: `rotate(${position === 'left' ? rotation : position === 'right' ? rotation : -rotation}deg)`,
                }}
            >
                <path fill={color} d="M25 34c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm0-16c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z" /><path d="M27.7 44h-5.4l-1.5-4.6c-1-.3-2-.7-2.9-1.2l-4.4 2.2-3.8-3.8 2.2-4.4c-.5-.9-.9-1.9-1.2-2.9L6 27.7v-5.4l4.6-1.5c.3-1 .7-2 1.2-2.9l-2.2-4.4 3.8-3.8 4.4 2.2c.9-.5 1.9-.9 2.9-1.2L22.3 6h5.4l1.5 4.6c1 .3 2 .7 2.9 1.2l4.4-2.2 3.8 3.8-2.2 4.4c.5.9.9 1.9 1.2 2.9l4.6 1.5v5.4l-4.6 1.5c-.3 1-.7 2-1.2 2.9l2.2 4.4-3.8 3.8-4.4-2.2c-.9.5-1.9.9-2.9 1.2L27.7 44zm-4-2h2.6l1.4-4.3.5-.1c1.2-.3 2.3-.8 3.4-1.4l.5-.3 4 2 1.8-1.8-2-4 .3-.5c.6-1 1.1-2.2 1.4-3.4l.1-.5 4.3-1.4v-2.6l-4.3-1.4-.1-.5c-.3-1.2-.8-2.3-1.4-3.4l-.3-.5 2-4-1.8-1.8-4 2-.5-.3c-1.1-.6-2.2-1.1-3.4-1.4l-.5-.1L26.3 8h-2.6l-1.4 4.3-.5.1c-1.2.3-2.3.8-3.4 1.4l-.5.3-4-2-1.8 1.8 2 4-.3.5c-.6 1-1.1 2.2-1.4 3.4l-.1.5L8 23.7v2.6l4.3 1.4.1.5c.3 1.2.8 2.3 1.4 3.4l.3.5-2 4 1.8 1.8 4-2 .5.3c1.1.6 2.2 1.1 3.4 1.4l.5.1 1.4 4.3z" />
            </svg>
        </div>
    );
};

const GearRail: React.FC<GearProps> = ({
    position,
    size,
    color,
    offset = 0,
}) => {
    return (
        <div
            className={`absolute top-1/2 ${position === 'left' ? 'left-0' : position === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 pointer-events-none z-[0]`}
            style={{
                transform: `translateY(${offset}px)`,
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 50 50"
                className="opacity-15 hover:opacity-60 transition-opacity duration-300"
                style={{
                    transform: position === 'left' ? 'scaleX(-1)' : undefined,
                }}
            >
                <path d="M 46.461 20.952 C 46.761 19.952 46.861 30.452 46.561 29.452 L 41.861 27.852 L 41.861 22.452 L 46.461 20.952" />
                <path d="M 46.494 15.982 L 49.897 15.982 L 49.897 34.044 L 46.494 34.044 L 46.494 15.982 Z" />
            </svg>
        </div>
    );
};


const ScrollingGears: React.FC = () => {
    const [maxGears, setMaxGears] = useState(0);

    useEffect(() => {
        const calculateMaxGears = () => {
            const max = Math.max(
                window.innerHeight / 18,
                document.documentElement.scrollHeight / 32
            );
            setMaxGears(Math.ceil(max));
        };

        calculateMaxGears();

        window.addEventListener('resize', calculateMaxGears);
        window.addEventListener('scroll', calculateMaxGears);

        return () => {
            window.removeEventListener('resize', calculateMaxGears);
            window.removeEventListener('scroll', calculateMaxGears);
        };
    }, []);

    return (
        <>
            {/* Left side gears */}
            <Gear position="left" size={70} color="var(--primary)" offset={-120} rotationMultiplier={20} />
            <Gear position="left" size={70} color="var(--primary)" offset={150} rotationMultiplier={20} />

            {/* Right side gears */}
            <Gear position="right" size={70} color="var(--primary)" offset={-120} rotationMultiplier={-20} />
            <Gear position="right" size={70} color="var(--primary)" offset={150} rotationMultiplier={-20} />

            {/* GearRails */}
            {Array.from({ length: maxGears }, (_, i) => (
                <GearRail
                    key={i}
                    position="left"
                    size={70}
                    color="var(--primary)"
                    offset={-132 + i * 22.5}
                />
            ))}
            {Array.from({ length: maxGears }, (_, i) => (
                <GearRail
                    key={i + maxGears}
                    position="right"
                    size={70}
                    color="var(--primary)"
                    offset={-132 + i * 22.5}
                />
            ))}
        </>
    );
};


export default ScrollingGears;