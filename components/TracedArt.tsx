import { withBase } from "../lib/base-path";

type TracedArtProps = {
  name: "portrait";
  width: number;
  height: number;
};

export function TracedArt({ name, width, height }: TracedArtProps) {
  return (
    <div data-art={name} style={{ aspectRatio: `${width} / ${height}` }}>
      <img src={withBase(`/art/${name}.svg`)} width={width} height={height} alt="" loading="eager" decoding="async" fetchPriority="high" />
    </div>
  );
}
