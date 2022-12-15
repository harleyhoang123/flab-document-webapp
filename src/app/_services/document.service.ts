import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {GetPageOfDocument} from "../_models/get-page-of-document";
import {Response} from "../_models";
import {GetPageDetail} from "../_models/get-page-detail";
import {AccountService} from "./account.service";
import {PageableResponse} from "../_models/pageable-response";
import {Space} from "../_models/space";
import {Document} from "../_models/document";
import {Storage} from "./storage";
import {UpdatePageRequest} from "../_models/update-page-request";
import {CreatePageInDocument} from "../_models/create-page-in-document";

@Injectable({providedIn: 'root'})
export class DocumentService{


  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private storage: Storage
  ) {}

  getListDocument(){

  }

  getListPage(documentId: string){
    return this.http.get('http://localhost:3000/document/space').pipe(map(response => {
      return response;
    }))
  }

  getPageContent(pageId: string){
    return this.http.get("http://localhost:3000/document/page").pipe(map(response =>{
      return response;
    }));
  }

  createPageInDocument(documentId: string, data: CreatePageInDocument){
    return this.http.post("http://localhost:8099/flab/document/public/api/v1/documents/:document-id/pages/page".replace(":document-id", documentId), data)
      .pipe(map(response => {
        return response;
      }))
  }

  createPageInPage(pageId: string, data: CreatePageInDocument){
    return this.http.post("http://localhost:8099/flab/document/public/api/v1/pages/:page-id/page".replace(":page-id", pageId), data)
      .pipe(map(response => {
        return response;
      }))
  }

  getPageOfDocument(documentId: string){
    return this.http.get<Response<GetPageOfDocument>>("http://localhost:8099/flab/document/public/api/v1/documents/:document-id/pages".replace(":document-id", documentId))
      .pipe(map(
      response => {
        console.log("Response: "+ JSON.stringify(response))
        return response.data;
      }
    ));
  }

  getSpaceByAccountId(accountId: string){
    return this.http.get<Response<PageableResponse<Space>>>("http://localhost:8099/flab/document/public/api/v1/documents/account/:account-id".replace(":account-id", accountId))
      .pipe(map(
        response => {
          console.log("Response in getSpaceByAccountId: "+ JSON.stringify(response));
          return response.data;
        }
      ));
  }


  getPageDetail(pageId: string){
    console.log("get page detail in  document: "+ pageId);
    const memberId = this.storage.getItem("currentMemberId");
    console.log("member id"+ memberId)
    return this.http.get<Response<GetPageDetail>>("http://localhost:8099/flab/document/public/api/v1/pages/:page-id/:member-id".replace(":page-id", pageId).replace(":member-id", <string>memberId))
      .pipe(map(
        response => {
          return response.data;
        }
      ));
  }

  getDocumentDetail(documentId: string){
    return this.http.get<Response<Document>>("http://localhost:8099/flab/document/public/api/v1/documents/:document-id".replace(":document-id", documentId))
      .pipe(map(
        response => {
          console.log("response get document detail: "+ JSON.stringify(response));
          this.storage.setItem("currentMemberId", <string>response.data?.memberInfo?.memberId);
          return response.data;
        }
      ));
  }

  getPageOverview(documentId: string){
    return this.http.get<Response<GetPageDetail>>("http://localhost:8099/flab/document/public/api/v1/documents/:document-id/overview".replace(":document-id", documentId))
      .pipe(map(
        response => {
          return response.data;
        }
      ));
  }

  updatePage(pageId: string, data: UpdatePageRequest){
    const json = JSON.stringify(data);
    return this.http.put("http://localhost:8099/flab/document/public/api/v1/pages/:page-id".replace(":page-id", pageId),
      data);
  }
}
