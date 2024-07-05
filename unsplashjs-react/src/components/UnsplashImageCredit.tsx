import classNames from 'classnames';
import type { Full } from 'unsplash-js/dist/methods/photos/types';

export interface UnsplashImageCreditProps extends React.HTMLAttributes<HTMLAnchorElement> {
  photoResp: Full | null;
}

function createAttributeLink(link?: string): string {
  if (!link) {
    return '';
  }
  const separator = link.match(/\?w=/i) ? '&' : '?';
  return link + separator + ['utm_source=NoodlesHouse', 'utm_medium=referral'].join('&');
}

export const UnsplashImageCredit = ({
  photoResp,
  className,
  ...rest
}: UnsplashImageCreditProps) => {
  // We must credit the creator of the images with a click section
  if (!photoResp) {
    return null;
  }

  return (
    <a
      {...rest}
      className={classNames(
        className,
        'credit-section absolute bottom-0 left-0 right-0 px-3 py-1',
        'text-nh-whiteish bg-nh-bali-hai-500/50 hover:bg-nh-bali-hai-500/75 text-right text-sm leading-4'
      )}
      href={createAttributeLink(photoResp.links?.html)}
    >
      <span className="pr-1">Credit:</span>
      <a
        href={createAttributeLink(photoResp.user.portfolio_url!)}
        className="italic hover:font-bold"
      >
        {photoResp.user.name}
      </a>
      <span className="px-1">on</span>
      <a
        href={createAttributeLink('https://unsplash.com/')}
        className="hover:font-bold"
      >
        Unsplash
      </a>
    </a>
  );
};
export default UnsplashImageCredit;
