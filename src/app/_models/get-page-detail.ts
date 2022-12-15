import {Activity} from "./activity";

export class GetPageDetail {
  pageId?: string;
  title?: string;
  content?: string;
  version?: string;
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  activities?: [Activity]

}
