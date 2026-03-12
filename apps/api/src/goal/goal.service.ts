import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalService {
    constructor(private readonly prisma:PrismaService){}

    async getGoals(weekId:number){
        const goal = await this.prisma.goal.findMany({
            where:{
                weekId
            }
        })
        return goal
    }
    async findOne(id:number){
        const goal = await this.prisma.goal.findUnique({
            where:{id}
        })
        if(!goal) {
            throw new NotFoundException(`L'objectif avec l'id ${id} n'existe pas`)
        }
        return goal;
    }

    async createGoal(weekId:number,goal:CreateGoalDto){
        const newGoal = await this.prisma.goal.create({
            data:{
                weekId,
                ...goal,
                status:"A_FAIRE"
            }
        })
        return newGoal
    }
    async updateGoal(id:number,updateGoal:UpdateGoalDto){
        await this.findOne(id)
        return this.prisma.goal.update({
            where:{id},
            data:{
                ...updateGoal
            }
        })
    }
    
    async deleteGoal(id:number){
        await this.findOne(id)
        return this.prisma.goal.delete({
            where:{id}
        })
    }
}
