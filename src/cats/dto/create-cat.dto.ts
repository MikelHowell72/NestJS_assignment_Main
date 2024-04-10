import { IsInt, IsString, Length } from 'class-validator';


export class CreateCatDto {

    @IsString()
    @Length(3, 20)
    readonly name: string;

    @IsInt()
    readonly age: number;

    @IsString()
    @Length(3, 20)
    readonly breed: string;

}
