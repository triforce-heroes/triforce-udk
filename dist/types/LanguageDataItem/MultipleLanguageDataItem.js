import{BufferBuilder as e}from"@triforce-heroes/triforce-core/BufferBuilder";import{LanguageDataItemBase as t}from"./LanguageDataItemBase.js";export class MultipleLanguageDataItem extends t{constructor(e,t,r,i,n){super(e,t,r,i),this.references=n}static from(e,t,r){let i=r.readUnsignedInt32(),n=r.readLengthPrefixedString(4);r.skipPadding(4);let a=r.readUnsignedInt32(),s=[];for(let e=0;e<a;e++)s.push(r.readInt64());return new MultipleLanguageDataItem(e,t,i,n,s)}toBuffer(){let t=new e;for(let e of(t.writeInt64(this.reference),t.writeLengthPrefixedString("MultipleLanguageDataItem",4),t.pad(4),t.writeLengthPrefixedString(this.projectName,4),t.pad(4),t.writeLengthPrefixedString("Assembly-CSharp",4),t.pad(4),t.writeUnsignedInt32(this.messageId),t.writeLengthPrefixedString(this.messageName,4),t.pad(4),t.writeUnsignedInt32(this.references.length),this.references))t.writeInt64(e);return t.build()}}