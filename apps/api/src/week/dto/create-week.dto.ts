import {IsString,IsDate} from "class-validator"
import { Type } from "class-transformer"

export class CreateWeekDto{

    @IsDate()
    @Type(() => Date)  
    startDate: Date

    @IsString()
    description :string

    @IsString()
    summary: string

    @IsString()
    comments :string
}