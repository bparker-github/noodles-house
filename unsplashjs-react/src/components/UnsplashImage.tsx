import { useEffect, useState } from 'react';
import type { Full } from 'unsplash-js/dist/methods/photos/types';
import { useUnsplashContext } from '../lib/UnsplashContext';
import classNames from 'classnames';
import BlurCanvas from './BlurCanvas';
import UnsplashImageCredit from './UnsplashImageCredit';

enum UIS {
  ERROR = -1,
  NONE = 0,
  HAS_RESPONSE = 1,
  LOADED_REGULAR = 2,
}

type CN_Value = string | number | boolean | undefined | null;
type CN_Mapping = Record<string, unknown>;
interface CN_ArgumentArray extends Array<CN_Argument> {}
interface CN_ReadonlyArgumentArray extends ReadonlyArray<CN_Argument> {}
export type CN_Argument = CN_Value | CN_Mapping | CN_ArgumentArray | CN_ReadonlyArgumentArray;

export interface UnsplashImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The ID of the photo to fetch for this block. */
  id: string;
  /** An optional value indicating whether we want to omit the credit; non-standard. */
  omitCredit?: boolean;
  /** An optional value indicating the number of ms to display the Blur before transitioning back. @default 1000 */
  transitionTime?: number;
  /**
   * A ClassList of styles to apply to all levels of the image
   *  - Helpful for borders and rounded etc.
   */
  sharedClass?: CN_Argument;
  /**
   * An optional class-name argument to assign directly to the credit.
   * @example text-whiteish
   */
  creditClass?: CN_Argument;
}
export default function UnsplashImage(props: UnsplashImageProps) {
  const [state, setState] = useState(UIS.NONE);
  const [photoResp, setPhotoResp] = useState<Full | null>(null);
  const unsplashApi = useUnsplashContext();

  const blurHash = photoResp?.blur_hash ?? undefined;
  const description = photoResp?.description ?? photoResp?.alt_description ?? undefined;
  const scaledHeight = !photoResp
    ? undefined
    : Math.round((photoResp.height / photoResp.width) * 128);
  const scaledWidth = !photoResp ? undefined : 128;

  function handleImageLoaded() {
    setTimeout(() => setState(UIS.LOADED_REGULAR), props.transitionTime ?? 1000);
  }
  async function fetchImage(newId: string) {
    // Reset state. If we have a previous image, we can show it's blur until we re-load - continue fetch.
    setState(!photoResp ? UIS.NONE : UIS.HAS_RESPONSE);

    try {
      // Fetch and set state.
      const resp = await unsplashApi.getPhoto(newId);

      if (resp) {
        setState(UIS.HAS_RESPONSE);

        // Update the response, and continue onward.
        setPhotoResp(resp);
      } else {
        setState(UIS.ERROR);
      }
    } catch (err) {
      console.log('Unsplash image error:', err);
      setState(UIS.ERROR);
    }
  }
  useEffect(() => {
    fetchImage(props.id);
  }, [props.id]);

  return (
    <div className="unsplash-image relative">
      {/* <!-- Step 1: No data yet. Display a loading background. --> */}
      {state === UIS.NONE && (
        <div
          key="no-data"
          className={classNames('bg-nh-bourbon-200 absolute inset-0', props.sharedClass)}
        />
      )}

      {/* Step 2: The response has been fetched or loaded, add <img> to load the desired inner image url. */}
      {state >= UIS.HAS_RESPONSE && (
        <img
          key="main-image"
          className={classNames(
            'absolute inset-0 h-full w-full object-cover object-center',
            'opacity-0 transition-opacity duration-700',
            { 'opacity-100': state === UIS.LOADED_REGULAR },
            props.sharedClass
          )}
          src={photoResp?.urls.regular}
          alt={description}
          onLoad={handleImageLoaded}
        />
      )}

      {/* Step 2.5: Response contains a blur-hash (probably); we can display that for now. */}
      {/* Display it further down the DOM to be visible overtop of the <img> above */}
      <BlurCanvas
        key="blur-canvas"
        className={classNames(
          'absolute inset-0 h-full w-full',
          'opacity-0 transition-opacity',
          {
            'opacity-100': state === UIS.HAS_RESPONSE,
            'duration-250': state <= UIS.HAS_RESPONSE,
            'duration-1000': state > UIS.HAS_RESPONSE,
          },
          props.sharedClass
        )}
        height={scaledHeight}
        width={scaledWidth}
        hash={blurHash}
      />

      {/* The user can provide content to display overtop of this element (parent relative)*/}
      <div className={classNames('absolute inset-0 h-full w-full', props.sharedClass)}>
        {props.children}
      </div>

      {/* We must credit the creator of the images with a click section */}
      {photoResp && !props.omitCredit && (
        <UnsplashImageCredit
          photoResp={photoResp}
          className={classNames(props.creditClass)}
        />
      )}
    </div>
  );
}
