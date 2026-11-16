import { withBase } from "../lib/base-path";

type TracedArtProps = {
  name: "portrait" | "torana" | "buddha";
  width: number;
  height: number;
  lazy?: boolean;
};

export function TracedArt({ name, width, height, lazy }: TracedArtProps) {
  return (
    <span data-art={name} style={{ display: "block", aspectRatio: `${width} / ${height}` }}>
      <img src={withBase(`/art/${name}.svg`)} width={width} height={height} alt="" decoding="async" {...(lazy ? { loading: "lazy" } : { loading: "eager", fetchPriority: "high" })} />
    </span>
  );
}
