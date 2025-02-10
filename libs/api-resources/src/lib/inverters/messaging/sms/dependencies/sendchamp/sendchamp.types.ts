import { MessagingChannel } from "../types";

interface SendchampResponseStructure {
    code: number;
    errors: string;
    message: string;
    status: string;
}

export type SendchampSendOtpPayload = {
    channel: MessagingChannel;
    sender: string;
    token_type: string;
    token_length: number;
    expiration_time: number;
    customer_email_address?: string;
    customer_mobile_number?: string;
    meta_data: unknown;
}

export interface SendchampSendOtpResponse extends SendchampResponseStructure {
    data: {
        business_uid: string;
        reference: string;
        channel: {
            id: number;
            name: string;
            is_active: boolean
        };
        token: string;
        status: string
    };
}

export type SendchampVerifyOtpPayload = {
    verification_reference: string;
    verification_code: string
}

export interface SendchampVerifyOtpResponse extends SendchampResponseStructure {
    data: {
        channel: MessagingChannel;
        token: string;
        token_type: string;
        token_length: number;
        token_duration: string;
        status: string;
        phone: string;
        email: string;
        reference: string;
        created_at: string;
        updated_at: string;
    }
}