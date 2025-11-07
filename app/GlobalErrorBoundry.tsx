import { Link, useRouteError } from 'react-router';

export function GlobalErrorBoundary() {
  const error = useRouteError() as { status: number; message: string };

  const containerClassName =
    'flex h-screen w-full flex-col items-center justify-center gap-4 text-center';

  // You can check for different error types
  if (error.status === 404) {
    return (
      <div className={containerClassName}>
        <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <Link to="/">
          <button>Go home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Something went wrong
      </h1>
      <p className="text-muted-foreground">{error.message || 'Uknown error'}</p>
      <Link to="/">
        <button>Go home</button>
      </Link>
    </div>
  );
}
