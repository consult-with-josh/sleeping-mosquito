import { rateLimit } from 'express-rate-limit';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { GenericErrors } from '../constants';

export const TimeLimits = {
	oneMinute: 1 * 60 * 1000,
	threeMinutes: 3 * 60 * 1000,
	fifteenMinutes: 15 * 60 * 1000
};

const handleTooManyReq = ( timeLimit: number, res: Response ) => res.status( HttpStatusCode.TooManyRequests )
	.json(
		GenericErrors.tooManyRequests( timeLimit / ( 60*1000 ) ) 
	);



export const limitToOneReqPerMinuteOrCustom = ( timeLimit = TimeLimits.oneMinute ) => {
	return rateLimit( {
		windowMs: timeLimit,
		limit: 1,
		skipFailedRequests: true,
		handler: ( _req: Request, res: Response ) => handleTooManyReq( timeLimit, res ),
		validate: {
			xForwardedForHeader: false
		}
	} );
};

export const limitToHundredPerFifteenMins = () => {
	return rateLimit( {
		windowMs: TimeLimits.fifteenMinutes,
		limit: 100,
		skipFailedRequests: true,
		handler: ( _req: Request, res: Response ) => handleTooManyReq( TimeLimits.fifteenMinutes, res ),
		validate: {
			xForwardedForHeader: false
		}
	} );
};

export const limitRequestsTo = ( timeLimit = TimeLimits.fifteenMinutes, limit = 100 ) => {
	return rateLimit( {
		windowMs: timeLimit,
		limit,
		skipFailedRequests: true,
		handler: ( _req: Request, res: Response ) => handleTooManyReq( timeLimit, res ),
		validate: {
			xForwardedForHeader: false
		}
	} );
};