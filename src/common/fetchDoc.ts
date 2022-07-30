export const updateEntity = async (entities: any[], key: string, repo: any) => {
  entities.length &&
    (await Promise.all(
      entities.map((ent) => repo.save({ ...ent, [key]: null })),
    ));
};
