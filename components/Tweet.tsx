import { Loader } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";

export const Tweet: React.FC<{ id: string }> = ({ id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // @ts-expect-error
    window.twttr?.widgets.load(ref.current);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [id]);

  return (
    <div>
      {isLoading && (
        <div className="flex items-center justify-center pt-5">
          <Loader color="gray" variant="dots" />
        </div>
      )}

      <div
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
