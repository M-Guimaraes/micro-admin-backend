import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/categories/category.interface';
import { Player } from './interfaces/players/player.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Player') private readonly playerModel: Model<Player>
  ) { }

  private readonly logger = new Logger(AppService.name)

  async createCategory(category: Category): Promise<Category> {
    try {
      const createdCategory = new this.categoryModel(category)
      return await createdCategory.save()
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`)
      throw new RpcException(err.message)
    }
  }
}