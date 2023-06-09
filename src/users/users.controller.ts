import {
    Body,
    Controller,
    Delete,
    Get, NotFoundException,
    Param,
    Patch,
    Post, Session, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {AuthService} from "./auth.service";
import {CurrentUser} from "./decorators/current-user.decorator";
import {User} from "./user.entity";
import {CurrentUserInterceptor} from "./interceptors/current-user.interceptor";
import {AuthGuard} from "./guards/auth.guard";

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService: UsersService,
                private authService: AuthService) {
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user:User) {
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
        console.log('set color:', session.color)
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color;
    }

    @Post('/signup')
    async create(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id;
        return user;
    }

    @Get('/:id')
    async findUesr(@Param('id') id: string) {
        const user = await this.userService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user;
    }

    @Get()
    findAllUsers(@Param('email') email: string) {
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() boyd: UpdateUserDto) {
        return this.userService.update(parseInt(id), boyd);
    }
}
