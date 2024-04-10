import { IsString, IsOptional, IsArray, Length } from 'class-validator';
import { Transform, Exclude } from 'class-transformer';
export class CreateUserDto {

    @Length(3, 20)
    @IsString()
    readonly username: string;

    @Length(6, 20)
    @IsString()
    @Exclude()
    readonly password: string;

    @Transform(({ value }) => value.toUpperCase())
    @IsString()
    readonly role: string;

    @IsArray()
    @IsOptional()
    favoriteCats: string[];
}
