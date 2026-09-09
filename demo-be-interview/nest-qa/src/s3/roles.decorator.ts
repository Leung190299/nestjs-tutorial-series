import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 's3:roles';

// @Roles('admin') — gắn metadata role lên handler. Guard đọc metadata này
// qua Reflector + ExecutionContext, thứ mà middleware KHÔNG có.
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
