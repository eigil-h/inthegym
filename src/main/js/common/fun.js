import { useEffect, useRef } from 'react';

/**
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export function useInterval(callback, timeout) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, timeout);
    return () => clearInterval(id);
  }, [timeout]);
}

export function usePrevious(val) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = val;
  }, [val]);

  return ref.current;
}

export function noop() {}

/**
 * Creates an int array of 4 elements, each for the r, g, b and a values
 * @param color - either on the form '#rgb', '#rgba', '#rrggbb', '#rrggbbaa', 'rgb(r, g, b)' or 'rgba(r, g, b, a)'
 * the forms starting with a '#' are interpreted as hex values, the others as decimal.
 * @returns [r, g, b , a] integers
 */
export function colorToRgba(color) {
  let rgba;

  if (color.startsWith('#')) {
    const hex = color.slice(1);
    switch (hex.length) {
      case 3:
      case 4: {
        const p = hex.match(/./g);
        rgba = p.map((el) => parseInt(`${el}${el}`, 16));
      } break;
      case 6:
      case 8: {
        const p = hex.match(/.{1,2}/g);
        rgba = p.map((el, idx) => (idx < 3 ? parseInt(el, 16) : parseInt(el, 16) / 255));
      } break;
      default:
        throw Error(`Invalid hex value ${hex}`);
    }
  } else if (color.startsWith('rgb')) {
    const p = color.match(/[\d|.]{1,3}/g);
    rgba = p.map(parseFloat);
  } else {
    throw Error(`Unknown color value ${color}`);
  }

  if (rgba.length < 4) {
    rgba.push(1);
  }

  return rgba;
}

export function rgbaToColor(rgba) {
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
}
