import {UserInfo} from "./user-info";
import {LeftOffPage} from "./left-off-page";

export class Document{
  documentId?: string;
  documentName?: string;
  memberInfo?: UserInfo;
  leftOff?: [LeftOffPage];
  discover?: string;
}
