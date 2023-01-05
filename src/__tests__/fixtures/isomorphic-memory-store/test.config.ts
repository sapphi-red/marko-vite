import { MemoryStore, type Options } from "../../..";

export const ssr = true;
export async function steps() {
  await page.click("#clickable");
}
export const options: Options = {
  store: new MemoryStore(),
};
