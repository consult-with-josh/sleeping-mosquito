import { OutgoingEmailPayload } from "../../../messaging-dependency.interface";

export interface EmailDependency {
    sendEmail: ( payload: OutgoingEmailPayload ) => void;
}