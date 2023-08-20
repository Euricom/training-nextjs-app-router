export const notFound = (message = 'The resource is not found') => {
  return {
    error: 'NotFound',
    message,
  };
};
