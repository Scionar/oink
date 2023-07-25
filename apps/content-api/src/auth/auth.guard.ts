import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verifyAccessToken } from 'auth-verification';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    return Array.isArray(request.headers.bearer)
      ? request.headers.bearer[0]
      : request.headers.bearer;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    let publicKey: string;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      publicKey = await this.authService.getPublicKey();
    } catch (error) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await verifyAccessToken(token, publicKey);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
