import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    icons: [
      {
        src: '/favicon/NoodleIcon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
