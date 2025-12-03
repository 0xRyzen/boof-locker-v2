// Utility to convert image URLs to PNG format
export const toPng = (url: string): string => {
  return url.replace(/fm=jpg/g, 'fm=png');
};

// Convert all images in a lootbox to PNG
export const convertLootboxImagesToPng = <T extends { image: string; items?: Array<{ image: string }> }>(
  lootbox: T
): T => {
  return {
    ...lootbox,
    image: toPng(lootbox.image),
    items: lootbox.items?.map(item => ({
      ...item,
      image: toPng(item.image)
    }))
  };
};
