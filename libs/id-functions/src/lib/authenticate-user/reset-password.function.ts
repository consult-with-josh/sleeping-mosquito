import { Request, Response } from "express";
import { ResetPasswordResource, OtpContext, CookieStructure } from "@scalex-api/sdk";
import { notifyClientOfSuccess, throwScalexError, verifyOtp } from "@scalex-api/api-resources";
import { User } from "@scalex-api/api-resources";
import { RedisClientOptions } from "redis";

export type ResetPasswordArgs = {
    req: Request;
    res: Response;
    jwtSecret: string;
    cacheConfig: RedisClientOptions;
};

export async function resetPassword(
    args: ResetPasswordArgs
): Promise<typeof ResetPasswordResource.response> {
    try {
        const { email, otp, newPassword, confirmNewPassword } = args.req.body;
        if (!email || !otp || !newPassword || !confirmNewPassword) {
            throw new Error("Missing required fields");
        }
        if (newPassword !== confirmNewPassword) {
            throw new Error("Passwords do not match");
        }

        await verifyOtp({
            payload: { recipient: email, context: OtpContext.resetPassword, otp },
            cacheConfig: args.cacheConfig,
        });
        const user = await User.model.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        user.updatePassword(newPassword);
        await user.save();

        return notifyClientOfSuccess<{ cookies?: CookieStructure[] }>({
            statusCode: 200,
            message: "Password reset successful",
            data: { cookies: [] },
        });
    } catch (error) {
        throwScalexError(error);
    }
}
