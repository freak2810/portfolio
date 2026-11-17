import { withBase } from "../lib/base-path";

type TracedArtProps = {
  name: "portrait" | "torana" | "buddha";
  width: number;
  height: number;
};

export function TracedArt({ name, width, height }: TracedArtProps) {
  return (
    <span data-art={name} style={{ display: "block", aspectRatio: `${width} / ${height}` }}>
      <img src={withBase(`/art/${name}.svg`)} width={width} height={height} alt="" loading="lazy" decoding="async" />
    </span>
  );
}
