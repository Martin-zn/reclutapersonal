import fetcher from '@/lib/client/fetcher';

const handleOnError = (error) => {
  // No romper la app en demo: loguear y continuar
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('[SWR error]', error);
  }
  // Si alguna vez queremos manejar 401:
  // if (error?.status === 401) { /* opcional: redirigir o mostrar toast */ }
};

const swrConfig = () => ({
  fetcher,
  onError: handleOnError,
  refreshInterval: 0,
});

export default swrConfig;
