export class User {
  constructor(
    public readonly version: number,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly login: string,
    public readonly password: string,
    public readonly id?: string,
  ) {}

  static toResponse = (user: User) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...rest } = user;
    return {
      createdAt: Number(createdAt),
      updatedAt: Number(updatedAt),
      ...rest,
    };
  };
}
