interface IFavouriteItems {
  items: { id: string }[];
  ids: string[];
}

export const findItemsById = (config: IFavouriteItems) => {
  const itemsObjects = config.ids.map((id) => {
    return config.items.find((item) => item.id === id);
  });

  return itemsObjects;
};
