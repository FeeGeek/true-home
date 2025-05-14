export class SysUser {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly nickName: string,
    public readonly avatar: string | null,
  ) {}
}
