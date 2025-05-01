import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Полное имя пользователя',
  })
  readonly name: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Пароль пользователя (должен быть безопасным)',
  })
  readonly password: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Адрес электронной почты пользователя',
  })
  readonly email: string;

  @ApiProperty({
    example: 25,
    description: 'Возраст пользователя',
  })
  readonly age: number;
}
