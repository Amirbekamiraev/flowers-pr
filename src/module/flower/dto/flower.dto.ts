import { ApiProperty } from '@nestjs/swagger';

export class FlowerDto {
  @ApiProperty({
    example: 'Ficus',
    description: 'Название цветка',
  })
  readonly title: string;

  @ApiProperty({
    example: 'Thrives in bright, indirect light. Avoid overwatering.',
    description: 'Описание ухода за цветком',
  })
  readonly description: string;

  @ApiProperty({
    example:
      'https://raw.githubusercontent.com/Arzymat01/data/main/images/1.jpeg',
    description: 'Ссылка на изображение цветка',
  })
  readonly imageUrl: string;

  @ApiProperty({
    example: 'Indoor',
    description: 'Категория цветка (например, Indoor, Outdoor, Medicinal)',
  })
  readonly category: string;

  @ApiProperty({
    example: 120,
    description: 'Количество воды (в мл) в день',
  })
  readonly waterAmountMlPerDay: number;
}
