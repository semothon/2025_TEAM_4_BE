import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInResponse {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQzODMzMjAwLCJleHAiOjE3NDQ0MzgwMDB9.htaCq0CKypl5xbF6IDRlmZ1EnUI364dyZZRe2_5mBgM',
        description: '액세스 토큰',
    })
    public readonly accessToken: string;
}
