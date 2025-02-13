import { Request, Response } from "express";
import { RequestPasswordResetResource, OtpContext, CookieStructure } from "@scalex-api/sdk";
import { notifyClientOfSuccess, throwScalexError, sendOtp } from "@scalex-api/api-resources";
import { RedisClientOptions } from "redis";
import { SocketConfig } from "@scalex-api/api-resources";

export type RequestPasswordResetArgs = {
    req: Request;
    res: Response;
    cacheConfig: RedisClientOptions;
    socketConfig: SocketConfig;
};

export async function requestPasswordReset(
    args: RequestPasswordResetArgs
): Promise<typeof RequestPasswordResetResource.response> {
    try {
        const { email } = args.req.body;
        if (!email) {
            throw new Error("Email is required");
        }
        await sendOtp({
            payload: { recipient: email, context: OtpContext.resetPassword },
            cacheConfig: args.cacheConfig,
            socketConfig: args.socketConfig,
        });
        return notifyClientOfSuccess<{ cookies?: CookieStructure[] }>({
            statusCode: 200,
            message: "OTP sent successfully",
            data: { cookies: [] },
        });
    } catch (error) {
        throwScalexError(error);
    }
}
