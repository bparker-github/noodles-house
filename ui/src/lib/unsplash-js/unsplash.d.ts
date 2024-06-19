import { createApi } from 'unsplash-js';

interface BaseUnsplashPhotoRequest {
  /** The identifier of the photo itself. */
  id: string;

  /** The value to pass as the width query parameter. */
  qp_width?: string;
  /** The value to pass as the height query parameter. */
  qp_height?: string;
  /**
   * The fit mode to use as the query parameter.
   * @default 'clip'
   */
  qp_fit?: 'clamp' | 'clip' | 'crop' | 'facearea' | 'fill' | 'fillmax' | 'max' | 'min' | 'scale';
}
interface CropRequest extends BaseUnsplashPhotoRequest {
  /** Required width, height, and crop fit. */
  qp_height: string;
  qp_width: string;
  qp_fit: 'crop';
}

export interface UnsplashPhotoRequest {
  id: string;
  qp_width: string;
  qp_height: string;
  qp_crop: string;
}
// always add "auto=fit"

export type UnsplashApi = ReturnType<typeof createApi>;
