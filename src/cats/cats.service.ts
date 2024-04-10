import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository:
      Repository<Cat>) { }

  async create(createCatDto: CreateCatDto) {
    const cat = this.catRepository.create(createCatDto)
    return await this.catRepository.save(cat);
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.findOne(id);

    if (!cat) {
      throw new NotFoundException();
    }

    Object.assign(cat, updateCatDto)

    return await this.catRepository.save(cat);
  }

  async remove(id: number) {
    const cat = await this.findOne(id);
    if (!cat) {
      throw new NotFoundException();
    }
    return await this.catRepository.remove(cat);
  }
}
