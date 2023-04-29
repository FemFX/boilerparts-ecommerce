import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(filter: {
    where: { id?: number; username?: string; email?: string };
  }): Promise<User> {
    return await this.userRepository.findOne({ ...filter });
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    const isUserExists = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });
    if (isUserExists) {
      return {
        warningMessage: 'Пользователь с таким именем или email уже существует',
      };
    }
    const hashedPass = await hash(createUserDto.password);
    const user = await this.userRepository
      .create({ ...createUserDto, password: hashedPass })
      .save();
    return user;
  }
}
