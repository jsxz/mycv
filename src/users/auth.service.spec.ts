import {AuthService} from "./auth.service";
import {Test} from "@nestjs/testing";
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import beforeEach from "node:test";

let service: AuthService

describe('can create an instance of auth service', async () => {
    beforeEach(async () => {
        const fakeUserService: Partial<UsersService> = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({id: 1, email, password} as User)
        }

        const module = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UsersService,
                useValue: fakeUserService
            }]
        }).compile();
        service = module.get(AuthService);
    });
    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });
    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup('anjun@g.com', '123456')
        expect(user.password).not.toEqual('123456');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })
});
