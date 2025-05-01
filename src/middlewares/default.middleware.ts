import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import uuid from 'uuid-base62';

export enum UserAgent {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
}

export interface ExtendedRequest extends Request {
  os: UserAgent;
  lang: string;
  refId: string;
  device: string;
  authToken: string;
}

@Injectable()
export class DefMiddleware implements NestMiddleware {
  constructor(private logger: CustomLogger) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    console.log('Req...');

    try {
      const refId: string = req.headers['reference-id'] || uuid.v4();

      req.device = req.headers['user-agent'] || '';
      req.refId = refId;

      this.logger.trace(
        JSON.stringify({
          headers: { ...req.headers },
          body: { ...req.body },
          path: req.path,
          queryParams: { ...req.query },
          extraParams: {
            os: req.os,
            lang: req.lang,
          },
        }),
        refId,
      );

      next();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          success: false,
          code: 500,
        },
        500,
      );
    }
  }
}
