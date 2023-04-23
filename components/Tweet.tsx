import { Loader } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";

export const Tweet: React.FC<{ id: string }> = ({ id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // @ts-expect-error
    window.twttr?.widgets.load(ref.current);
    setIsLoading(false);
  }, [id]);

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <Loader color="gray" size="md" variant="dots" />
        </div>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: generateEmbedHtml(id) }}
        ref={ref}
      />
    </>
  );
};

const generateEmbedHtml = (id: string): string => {
  if (!/^\d+$/u.test(id)) {
    throw new Error(`Invalid tweet ID: ${id}`);
  }

  return `<blockquote class="twitter-tweet"><a href="https://twitter.com/i/status/${id}"></a></blockquote>`;
};
