export class User {
  constructor(
    public readonly id: string,
    public readonly version: number,
    public readonly createdAt: number,
    public readonly updatedAt: number,
    public readonly login: string,
    public readonly password: string,
  ) {}

  static toResponse = (user: User) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  };
}
