// import { UnsplashImage } from '@noodles-house/unsplash';

export default function NotAllowedPage() {
  return (
    <main className="relative isolate min-h-full">
      <div
        id="W7cPLHOa0eQ"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        shared-class="flex flex-col flex-1 items-center justify-center rounded-md"
        credit-class="text-nh-whiteish rounded-b-md"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base font-semibold leading-8 text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-white/70 sm:mt-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="text-sm font-semibold leading-7 text-white"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
