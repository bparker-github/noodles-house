import { useRef } from 'react';
import classNames from 'classnames';
import { Transition } from '@headlessui/react';
import BlurCanvas, { BlurCanvasProps } from './BlurCanvas';

export interface BlurHashProps extends BlurCanvasProps {
  src?: string;
  srcset?: string;
  transitionDuration?: number;
}

export default function BlurImage({
  hash,
  height,
  width,
  punch,
  src,
  srcset,
  transitionDuration,
  ...rest
}: React.HTMLAttributes<HTMLImageElement> & BlurHashProps) {
  const isLoaded = useRef(false);

  return (
    <div className="relative transition-all duration-500">
      <Transition
        as="div"
        className="transition-group-for-blur inset absolute h-full w-full"
      >
        <BlurCanvas
          className={classNames(
            'canvas-for-blur',
            'transition duration-300 ease-in data-[closed]:opacity-0',
            'inset absolute h-full w-full',
            {
              hidden: isLoaded,
            }
          )}
          hash={hash}
          width={width}
          height={height}
          punch={punch}
        />
        <img
          className={classNames(
            'image-for-blur',
            'transition duration-300 ease-in data-[closed]:opacity-0',
            'inset absolute h-full w-full',
            {
              hidden: !isLoaded,
            }
          )}
          src={src}
          srcSet={srcset}
          onLoad={() => (isLoaded.current = true)}
          {...rest}
        />
      </Transition>
    </div>
  );
}
