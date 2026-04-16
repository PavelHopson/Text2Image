import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * EclipseSparkles — Starburst with 4 asymmetric rays, center glow dot,
 * small eclipse crescent in the upper-right corner.
 */
export const EclipseSparkles: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Main 4-point starburst — asymmetric rays */}
    <path d="M12 2 L13.2 9.5 L20 8 L14.5 12 L22 14 L13.5 13.8 L12 22 L11 13.5 L3 15 L9.5 12 L2 9 L10.8 10.2 Z" />
    {/* Center glow dot */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    {/* Eclipse crescent accent — upper right */}
    <path
      d="M19 3.5 A2.5 2.5 0 1 1 19 8.5 A1.8 1.8 0 1 0 19 3.5"
      stroke="#6BA3FF"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

/**
 * EclipseWand — Wand/stylus with glowing tip, small emanating particles,
 * sharp geometric design.
 */
export const EclipseWand: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Wand body — diagonal stylus */}
    <line x1="6" y1="18" x2="16" y2="8" />
    {/* Geometric handle grip */}
    <path d="M4.5 19.5 L6 18 L7.5 19.5 L6 21 Z" />
    {/* Wand tip — diamond */}
    <path d="M16 8 L17 6 L18 8 L17 10 Z" />
    {/* Glowing tip dot */}
    <circle cx="17" cy="6" r="1" fill="#F5A623" stroke="none" />
    {/* Emanating particles */}
    <line x1="19.5" y1="3" x2="20.5" y2="2" strokeWidth="1.5" />
    <line x1="21" y1="5" x2="22.5" y2="4.5" strokeWidth="1.5" />
    <line x1="20" y1="7.5" x2="21.5" y2="8" strokeWidth="1.5" />
    {/* Small spark dot */}
    <circle cx="19" cy="2" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * EclipseBookOpen — Open book with a glowing page, one page has
 * a tiny eclipse silhouette.
 */
export const EclipseBookOpen: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Book spine */}
    <path d="M12 6 L12 20" />
    {/* Left page */}
    <path d="M12 6 C12 6 9 4 3 5 L3 19 C9 18 12 20 12 20" />
    {/* Right page */}
    <path d="M12 6 C12 6 15 4 21 5 L21 19 C15 18 12 20 12 20" />
    {/* Eclipse silhouette on right page */}
    <circle cx="17" cy="11" r="2" stroke="#6BA3FF" strokeWidth="1.5" fill="none" />
    <path
      d="M17.8 9.5 A1.3 1.3 0 0 0 17.8 12.5"
      stroke="#6BA3FF"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Text lines on left page */}
    <line x1="5.5" y1="9" x2="9.5" y2="9" strokeWidth="1" opacity="0.4" />
    <line x1="5.5" y1="11.5" x2="10" y2="11.5" strokeWidth="1" opacity="0.4" />
    <line x1="5.5" y1="14" x2="9" y2="14" strokeWidth="1" opacity="0.4" />
  </svg>
);

/**
 * EclipseClock — Clock with eclipse-style broken ring,
 * hands pointing toward a glow accent.
 */
export const EclipseClock: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Broken circle — eclipse ring with gap at top-right */}
    <path d="M12 2 A10 10 0 1 1 20 6" />
    <path d="M20 6 A10 10 0 0 1 12 2" strokeDasharray="3 3" opacity="0.4" />
    {/* Hour hand */}
    <line x1="12" y1="12" x2="12" y2="7.5" />
    {/* Minute hand */}
    <line x1="12" y1="12" x2="16" y2="10" />
    {/* Center dot */}
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    {/* Glow accent at 2 o'clock position */}
    <circle cx="18.5" cy="5" r="1.2" fill="#F5A623" stroke="none" opacity="0.85" />
  </svg>
);

/**
 * EclipseSettings — Gear with eclipse crescent cut-out,
 * subtle inner ring detail.
 */
export const EclipseSettings: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Gear outer profile — 6 teeth */}
    <path d="M10.5 2.5 L13.5 2.5 L14.5 5 L17.5 6 L20 4.5 L21.5 6.5 L19.5 9 L20 12 L22 13.5 L21 16 L18 16 L16 18.5 L16.5 21.5 L14 22 L12 19.5 L9 20 L7.5 22 L5.5 21 L6 18 L3.5 16 L2 14 L4 12 L3.5 9 L2 7 L4 5.5 L6.5 6 L9 4 Z" />
    {/* Inner ring */}
    <circle cx="12" cy="12" r="3.5" />
    {/* Eclipse crescent cut-out accent */}
    <path
      d="M13 9.5 A2 2 0 0 1 13 14.5 A1.3 1.3 0 0 0 13 9.5"
      stroke="#6BA3FF"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

/**
 * EclipseHeart — Heart shape with eclipse corona glow around it.
 */
export const EclipseHeart: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Corona glow — outer ring behind heart */}
    <path
      d="M12 5 C12 5 8 1 4.5 4.5 C1 8 4 13 12 21 C20 13 23 8 19.5 4.5 C16 1 12 5 12 5"
      stroke="#F5A623"
      strokeWidth="1"
      opacity="0.35"
      transform="scale(1.08) translate(-1, -0.8)"
    />
    {/* Main heart */}
    <path d="M12 5 C12 5 8 1 4.5 4.5 C1 8 4 13 12 21 C20 13 23 8 19.5 4.5 C16 1 12 5 12 5" />
    {/* Small corona accent dot */}
    <circle cx="18" cy="3.5" r="0.8" fill="#F5A623" stroke="none" opacity="0.8" />
  </svg>
);

/**
 * EclipseDownload — Arrow pointing down into an eclipse ring portal.
 */
export const EclipseDownload: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Arrow shaft */}
    <line x1="12" y1="3" x2="12" y2="14" />
    {/* Arrow head */}
    <polyline points="8,11 12,15 16,11" />
    {/* Eclipse ring portal at bottom */}
    <ellipse cx="12" cy="19" rx="7" ry="2.5" />
    {/* Broken inner ring — portal depth */}
    <path d="M7 19 A5 1.5 0 0 1 17 19" strokeDasharray="2.5 2" opacity="0.4" />
    {/* Accent glow on portal */}
    <ellipse cx="12" cy="19" rx="7" ry="2.5" stroke="#6BA3FF" strokeWidth="0.75" opacity="0.5" />
  </svg>
);

/**
 * EclipseSearch — Magnifying glass with eclipse ring as the lens.
 */
export const EclipseSearch: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Outer lens ring */}
    <circle cx="10.5" cy="10.5" r="7" />
    {/* Eclipse inner ring — partial, creating crescent feel */}
    <path d="M13 5.5 A5 5 0 0 1 13 15.5" strokeWidth="1.5" opacity="0.3" />
    {/* Inner dark disc */}
    <circle cx="10.5" cy="10.5" r="3" strokeWidth="1" opacity="0.5" />
    {/* Accent corona flare */}
    <circle cx="14" cy="7" r="1" fill="#F5A623" stroke="none" opacity="0.75" />
    {/* Handle */}
    <line x1="16" y1="16" x2="21" y2="21" strokeWidth="2" />
  </svg>
);

/**
 * EclipseEye — Eye with eclipse as the pupil (dark disc with corona).
 */
export const EclipseEye: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Eye shape — upper lid */}
    <path d="M2 12 C2 12 6 5 12 5 C18 5 22 12 22 12" />
    {/* Eye shape — lower lid */}
    <path d="M2 12 C2 12 6 19 12 19 C18 19 22 12 22 12" />
    {/* Iris ring */}
    <circle cx="12" cy="12" r="3.5" />
    {/* Eclipse pupil — dark disc */}
    <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
    {/* Corona glow ring */}
    <circle cx="12" cy="12" r="3.5" stroke="#6BA3FF" strokeWidth="0.75" opacity="0.6" />
    {/* Corona flare highlight */}
    <circle cx="14.5" cy="10" r="0.7" fill="#6BA3FF" stroke="none" opacity="0.65" />
  </svg>
);

/**
 * EclipseZap — Lightning bolt with glow, sharper geometric angles.
 */
export const EclipseZap: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Main bolt — sharp geometric */}
    <polygon points="13,2 4,14 11,14 10,22 20,9 13.5,9 15,2" />
    {/* Inner accent line for depth */}
    <line x1="10" y1="9" x2="13" y2="9" strokeWidth="1" opacity="0.4" />
    {/* Glow dot at tip */}
    <circle cx="10" cy="22" r="1" fill="#F5A623" stroke="none" opacity="0.8" />
    {/* Small spark accent */}
    <line x1="17" y1="4" x2="19" y2="3" stroke="#F5A623" strokeWidth="1.25" opacity="0.7" />
  </svg>
);
