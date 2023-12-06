import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  let errMsg: string;

  // refer here: https://stackoverflow.com/questions/75944820/whats-the-correct-type-for-error-in-userouteerror-from-react-router-dom

  if (isRouteErrorResponse(error)) {
    errMsg = error.statusText;
  } else if (error instanceof Error) {
    errMsg = error.message;
  } else if (typeof error === 'string') {
    errMsg = error;
  } else {
    console.log(error);
    errMsg = 'Unknown Error';
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errMsg}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
