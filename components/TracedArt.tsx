import { withBase } from "../lib/base-path";

type TracedArtProps = {
  name: "portrait" | "torana" | "buddha";
  layers: readonly string[];
  width: number;
  height: number;
  reveal?: "load" | "scroll";
  className?: string;
};

export function TracedArt({ name, layers, width, height, reveal = "scroll", className }: TracedArtProps) {
  return (
    <div data-art={name} data-art-mode={reveal} className={className} style={{ aspectRatio: `${width} / ${height}` }}>
      {layers.map((layer, i) => {
        // the first layer of a picture in the first viewport is its base: fetch it early so it can paint
        const base = reveal === "load" && i === 0;
        return (
          <img
            key={layer}
            src={withBase(`/art/${name}-${layer}.svg`)}
            width={width}
            height={height}
            alt=""
            loading={base ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={base ? "high" : "low"}
            data-layer={layer}
          />
        );
      })}
    </div>
  );
}
