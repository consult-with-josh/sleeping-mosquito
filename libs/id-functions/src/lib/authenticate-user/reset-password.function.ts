import { Request, Response } from "express";
import { ResetPasswordResource, OtpContext, CookieStructure, ScxError } from "@scalex-api/sdk";
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
            throw <ScxError>{
                statusCode: 400,
                message: "Missing required fields",
                recommendedActions: ["Ensure all required fields are provided."]
            };
        }

        if (newPassword !== confirmNewPassword) {
            throw <ScxError>{
                statusCode: 400,
                message: "Passwords do not match",
                recommendedActions: ["Ensure both password fields match."]
            };
        }

        await verifyOtp({
            payload: { recipient: email, context: OtpContext.resetPassword, otp },
            cacheConfig: args.cacheConfig,
        });

        const user = await User.model.findOne({ email });
        if (!user) {
            throw <ScxError>{
                statusCode: 400,
                message: "User not found",
                recommendedActions: ["Ensure the email is correct and try again."]
            };
        }

        user.updatePassword(newPassword);
        await user.save();

        return notifyClientOfSuccess<{ cookies?: CookieStructure[] }>({
            statusCode: 200,
            message: "Password reset successful",
        });
    } catch (error) {
        console.log(error)
        throwScalexError(error);
    }
}
