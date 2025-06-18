import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import type { AppRouter } from "@/server/trpc";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact <AppRouter> ();

export const trpcClientOptions = {
    links: [
        httpBatchLink({
            url: "/api/trpc"
        }),
    ],
};