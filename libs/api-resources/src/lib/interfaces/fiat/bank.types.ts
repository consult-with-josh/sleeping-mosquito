import { IBaseModel, ActiveOrInactive } from "@scalex-api/sdk";
import { ResourceOwner } from "../utility-enums";

export interface IBankAccount extends IBaseModel {
  owner: {
      type: ResourceOwner;
      id: string;
  };
  nuban: string;
  bank: string;
  currency?: string;
  status: ActiveOrInactive;
  meta: {
      accountName: string;
  }
}
