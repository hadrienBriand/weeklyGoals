import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Controller('week/:weekId/goals')
export class GoalController {
    constructor(private readonly goal:GoalService) {}

    @Get()
    findAll(@Param("weekId",ParseIntPipe) weekId:number){
        return this.goal.getGoals(weekId)
    }
    @Get('/:id')
    findOne(@Param("id",ParseIntPipe)id:number  ){
        return this.goal.findOne(id)
    }
    
    @Post()
    create(@Param('weekId',ParseIntPipe) weekId:number, @Body() body:CreateGoalDto){
        return this.goal.createGoal(weekId,body)
    }

    @Patch("/:id")
    update(@Param('id',ParseIntPipe)id: number, @Body() body:UpdateGoalDto){
        return this.goal.updateGoal(id,body)
    }
    
    @Delete("/:id")
    delete(@Param("id",ParseIntPipe) id : number){
        return this.goal.deleteGoal(id)
    }
}
