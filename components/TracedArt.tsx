import { withBase } from "../lib/base-path";

type TracedArtProps = {
  name: "portrait";
  layers: readonly string[];
  width: number;
  height: number;
  className?: string;
};

export function TracedArt({ name, layers, width, height, className }: TracedArtProps) {
  return (
    <div data-art={name} className={className} style={{ aspectRatio: `${width} / ${height}` }}>
      {layers.map((layer, i) => {
        // the first layer of the picture sits in the first viewport and is its base: fetch it early so it can paint
        const base = i === 0;
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
