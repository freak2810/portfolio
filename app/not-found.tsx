import { withBase } from "../lib/base-path";
import { content } from "../content";
import { NotFound } from "../components/NotFound";

const { notFound } = content.ui;

export const metadata = { title: notFound.title };

export default function NotFoundPage() {
  return <NotFound title={notFound.title} body={notFound.body} homeLabel={notFound.homeLabel} homeHref={withBase("/")} />;
}
