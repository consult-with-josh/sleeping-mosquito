import { MessagingChannel } from "../types";

export enum TermiiPinPlaceholder {
    Placeholder = '< 1234 >'
}

export enum TermiiTrueOrFalse {
    True = 'True',
    False = 'False',
}

export const TermiiPinExpiry = 10;

export enum TermiiMessageType {
    Numeric = 'NUMERIC',
    AlphaNumeric = 'ALPHANUMERIC'
}

export type TermiiSendOtpPayload = {
    api_key: string;
    message_type: TermiiMessageType;
    to: string;
    from: string;
    channel: MessagingChannel;
    pin_attempts: number;
    pin_time_to_live: number;
    pin_length: number;
    pin_placeholder: TermiiPinPlaceholder;
    message_text: string;
    pin_type: TermiiMessageType;
}

export interface TermiiSendOtpResponse {
    pinId: string;
    to: string;
    smsStatus: string;
}

export type TermiiVerifyOtpPayload = {
    api_key: string;
    pin_id: string;
    pin: string;
}

export interface TermiiVerifyOtpResponse {
    pinId: string;
    verified: TermiiTrueOrFalse;
}