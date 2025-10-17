import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import App from "./Notes.client";



export default async function Notes() {
    const queryClient = new QueryClient();

    const search = '';
    const currentPage = 1;

    await queryClient.prefetchQuery({
        queryKey: ['notes', search, currentPage - 1],
        queryFn: () => fetchNotes(search, currentPage)
    })


  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <App initialSearch={search} initialPage={currentPage} />
          </HydrationBoundary>
  );
}


