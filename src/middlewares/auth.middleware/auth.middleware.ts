import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { isNotEmpty } from "class-validator";
import { USER_ID_COOKIE_NAME } from "src/common/constants";
import { AutheService } from "src/global-service/auth-service/auth.service";
import { decryptData } from "src/utils/utils";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    try {
      const userIdCookie = decryptData(req.cookies[USER_ID_COOKIE_NAME]);
      if (!isNotEmpty(userIdCookie)) {
        throw Error("empty cookie");
      }

      // authorised
      AutheService.sessionId = userIdCookie;

      next();
    } catch (err) {
      Logger.error(err);
      throw new UnauthorizedException("Invalid user cookie");
    }
  }
}
