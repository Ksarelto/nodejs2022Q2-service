interface IRepository {
  findOneOrFail: (id: string) => Promise<any>;
}

interface IMethod {
  id: string;
  repo: IRepository;
}

const findOne = async ({ id, repo }: IMethod) =>
  id ? await repo.findOneOrFail(id) : null;

export { findOne };
