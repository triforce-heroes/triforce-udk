export abstract class LanguageDataItemBase {
  public constructor(
    public reference: bigint,
    public projectName: string,
    public messageId: number,
    public messageName: string,
  ) {}

  public abstract toBuffer(): Buffer;
}
