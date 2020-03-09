import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const responseInterceptor = httpClient.interceptors.response.use(
    res => res,
    err => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(responseInterceptor);
    };
  }, [
    httpClient.interceptors.request,
    httpClient.interceptors.response,
    reqInterceptor,
    responseInterceptor,
  ]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
