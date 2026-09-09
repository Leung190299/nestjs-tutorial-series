import { IsEmail, IsInt, IsString, Min } from 'class-validator';

// DTO = hợp đồng dữ liệu vào. Type TypeScript bị xóa lúc runtime —
// chính các decorator class-validator dưới đây mới là thứ ValidationPipe đọc.
export class CreateOrderDto {
  @IsString()
  ten: string;

  @IsInt()
  @Min(1)
  soLuong: number;

  @IsEmail()
  email: string;
}
