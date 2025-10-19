import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ example: 'coca-cola', description: 'The name of the item' })
  name: string;
}