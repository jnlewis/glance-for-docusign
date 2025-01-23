import { Skeleton } from '@/components/ui/skeleton';

interface CardLoadingProps {
  cardCount?: number;
}

export default function CardLoading({ cardCount = 3 }: CardLoadingProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(cardCount)].map((_, index) => (
          <div key={index} className="bg-card rounded-lg shadow-md p-6">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <div className="flex justify-end mt-6">
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
