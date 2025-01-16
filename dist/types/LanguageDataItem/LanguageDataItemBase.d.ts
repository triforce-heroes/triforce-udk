export declare abstract class LanguageDataItemBase {
    reference: bigint;
    projectName: string;
    messageId: number;
    messageName: string;
    constructor(reference: bigint, projectName: string, messageId: number, messageName: string);
    abstract toBuffer(): Buffer;
}
