import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateItemDto } from './app.dto';

@ApiTags('items')
@Controller('items')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get the default message' })
  @ApiResponse({ status: 200, description: 'Returns the default message.' })
  getHello(): string {
    this.logger.log('GET /items called');
    return this.appService.getHello();
  }

  @Post()
  @ApiOperation({ summary: 'Create an item' })
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
  })
  create(@Body() createItemDto: CreateItemDto): string {
    this.logger.log(`POST /items called with body: ${JSON.stringify(createItemDto)}`);
    return `This action adds a new item with name: ${createItemDto.name}`;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item by id' })
  @ApiParam({ name: 'id', description: 'The ID of the item' })
  @ApiResponse({ status: 200, description: 'Return the item.' })
  findOne(@Param('id') id: string): string {
    this.logger.log(`GET /items/${id} called`);
    return `This action returns a #${id} item`;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an item' })
  @ApiParam({ name: 'id', description: 'The ID of the item to update' })
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({ status: 200, description: 'The item has been successfully updated.' })
  update(@Param('id') id: string, @Body() createItemDto: CreateItemDto): string {
    this.logger.log(`PUT /items/${id} called with body: ${JSON.stringify(createItemDto)}`);
    return `This action updates a #${id} item with name ${createItemDto.name}`;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item' })
  @ApiParam({ name: 'id', description: 'The ID of the item to delete' })
  @ApiResponse({ status: 200, description: 'The item has been successfully deleted.' })
  remove(@Param('id') id: string): string {
    this.logger.log(`DELETE /items/${id} called`);
    return `This action removes a #${id} item`;
  }
}
