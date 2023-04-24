import { Loader, Skeleton } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";

export const Tweet: React.FC<{ id: string }> = ({ id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // @ts-expect-error
    window.twttr?.widgets.load(ref.current);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [id]);

  return (
    <div className="mt-2">
      {isLoading && (
        <div className="h-[400px]">
          <div className="flex">
            <Skeleton width="100%" height={400} radius={12} />
          </div>
        </div>
      )}
      <div
        className="h-[400px]"
        dangerouslySetInnerHTML={{ __html: generateEmbedHtml(id) }}
        ref={ref}
      />
    </div>
  );
};

const generateEmbedHtml = (id: string): string => {
  if (!/^\d+$/u.test(id)) {
    throw new Error(`Invalid tweet ID: ${id}`);
  }

  return `<blockquote class="twitter-tweet"><a href="https://twitter.com/i/status/${id}"></a></blockquote>`;
};
