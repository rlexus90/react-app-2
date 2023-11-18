import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

export const FallbackRender: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="error-boundary">
      <h1>Something went wrong.</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Clear Error</button>
    </div>
  );
};
