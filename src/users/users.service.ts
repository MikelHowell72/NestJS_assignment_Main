import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:
      Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateFavorites(userId: string, catId: string) {
    const user = await this.userRepository.findOne({ where: { userId: +userId } });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.favoriteCats) {
      user.favoriteCats = [catId];
    } else {
      const uniqueCats = new Set(user.favoriteCats);
      uniqueCats.add(catId); // Prevent duplication of favorites
      user.favoriteCats = Array.from(uniqueCats);
    }

    return this.userRepository.save(user);
  }
}
