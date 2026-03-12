import { IsString,IsOptional,IsEnum } from "class-validator";
import { GoalStatus } from "src/generated/prisma/enums";
export class CreateGoalDto{

    @IsString()
    title:string

     @IsString()
    @IsOptional()
    description?: string

@IsEnum(GoalStatus)
    @IsOptional()
    status?: GoalStatus
}