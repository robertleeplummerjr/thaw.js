export function makeTestItems(qty: number) {
  const items: (() => void)[] = [];
  for (let i = 0; i < qty; i++) {
    items.push(() => {});
  }
  return items;
}
