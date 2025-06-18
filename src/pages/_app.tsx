import { trpc, trpcClientOptions } from '@/utils/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: any) {
  return (
    <trpc.Provider client={trpc.createClient(trpcClientOptions)} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}