import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('/sign-up')
    async signUp(
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('name') name: string,
        @Body('birthdate') birthdate: Date,
        @Body('gender') gender: string,
        @Body('country') country: string,
        @Body('university') university: string,
        @Body('department') department: string,
        @Body('studentId') studentId: string
    ){
        return this.userService.signUp(email, password, name, birthdate, gender, country, university, department, studentId);
    }

    @Post('/sign-in')
    async signIn(@Body('email') email: string ,@Body('password') password: string){
        return this.userService.signIn(email, password);
    }
}
