import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('login')
    Login() {
        return this.authService.login();

    }

    @Post('signup')
    Signup() {
        return this.authService.signup();

    }
}
