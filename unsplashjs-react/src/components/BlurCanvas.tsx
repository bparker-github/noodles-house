import { decode } from 'blurhash';
import { useEffect, useRef } from 'react';
import { parseAsInt } from '../lib/blurHashTools';

export interface BlurCanvasProps {
  /** The blurhash of the image to decode. */
  hash?: string;
  /** The optional height to decode as. @default 128 */
  height?: string | number;
  /** The optional width to decode as. @default 128 */
  width?: string | number;
  /** The optional 'punch' to scale the blurhash as. @default 1 */
  punch?: number;
}

export default function BlurCanvas(
  props: React.HTMLAttributes<HTMLCanvasElement> & BlurCanvasProps
) {
  const { hash, width, height, punch, ...rest } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const curHeight = useRef<number>(parseAsInt(props.height ?? 128));
  const curWidth = useRef<number>(parseAsInt(props.width ?? 128));

  function drawOnCanvas(hash: string, width: number, height: number, punch: number) {
    if (!canvasRef.current || !hash) {
      return;
    }

    const pixels = decode(hash, width, height, punch);
    const ctx2D = canvasRef.current.getContext('2d');
    const imageData = ctx2D?.createImageData(width, height);
    if (imageData) {
      imageData.data.set(pixels);
      ctx2D?.putImageData(imageData, 0, 0);
    }
  }

  // When any of these props change, run the "draw on canvas" logic.
  useEffect(
    () =>
      drawOnCanvas(
        props.hash ?? '',
        curWidth.current,
        curHeight.current,
        parseAsInt(props.punch ?? 1)
      ),
    [props.hash, curWidth.current, curHeight.current, props.punch]
  );

  return (
    <canvas
      {...rest}
      ref={(el) => (canvasRef.current = el)}
      width={curWidth.current}
      height={curHeight.current}
    />
  );
}
