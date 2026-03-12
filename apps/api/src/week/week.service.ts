import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';

@Injectable()
export class WeekService {
    constructor(private readonly prisma:PrismaService){}

     calculateEndDate (startDate: Date): Date {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 4); 
        return endDate;
    };

    async findAll(){
        return this.prisma.week.findMany({
            include:{
                goals:true
            }
        })
    }
    async findPassed(){
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return this.prisma.week.findMany({
            where:{
                OR:[
                    {endDate:{lte:today}},
                    {startDate:{gte:today}}
                ]
            },
            orderBy:{
                startDate:'desc'
            },
             include: {
            goals: {
                orderBy: [
                    { status: 'asc' },
                    { id: 'asc' }
                ]
            }
        }
        })
    }

    async findCurrent() {
        const today = new Date()
        
        const week = await this.prisma.week.findFirst({
            where: {
            startDate: {
                lte: today  
            },
            endDate:{
                gte:today
            }
            },
            orderBy: {
            startDate: 'desc'
            },
            include: {
            goals:{
                 orderBy: [
                     { status: 'asc' },
                    { id: 'asc' } 
                 ]
            }
            }
        })
        
        
        return week
        }


    async findOne(id: number) {
        const week = await this.prisma.week.findUnique({
            where: { id },
            include: { goals: true }
        })
        if (!week) {
            throw new NotFoundException("Cette semaine n'existe pas")
        }
        return week
    }

    async create(createWeekDto:CreateWeekDto){
        
        const existingWeek = await this.prisma.week.findUnique({
            where:{
                startDate:createWeekDto.startDate
            }
        })
        if(existingWeek){
            throw new ConflictException('Cette semaine existe déjà')
        }
        const calculatedEndDate = this.calculateEndDate(createWeekDto.startDate)
        return this.prisma.week.create({
            data: {
                startDate:createWeekDto.startDate,
                endDate:calculatedEndDate,
                description:createWeekDto.description,
                summary:createWeekDto.summary,
                comments:createWeekDto.comments
            }
        })
    }

    async delete(id:number){
        await this.findOne(id)
        return this.prisma.week.delete({
            where:{id}
        })
    }

    async update(id:number,weekUpdate:UpdateWeekDto){
       await this.findOne(id)
        return await this.prisma.week.update({
            where:{id},
            data:{
                ...weekUpdate
            },
             include: { 
                goals: {
                    orderBy: [
                     { status: 'asc' },
                    { id: 'asc' } 
                 ]
                } 
            }
        })
    }
    
}
