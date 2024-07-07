import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import AuthService from 'src/auth/auth.service';

@Injectable()
export class NoteGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const token: string = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Unauthorized!');
    }

    request.payload = await this.authService.verifyToken(token);
    return true;
  }
}
