import { Controller,Get,Post,Body,Request, Delete, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { WeekService } from './week.service';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';

@Controller('week')
export class WeekController {
    constructor(private readonly week:WeekService){}

    @Get()
    findAll(){
        return this.week.findAll()
    }
    @Get('/passed')
    findPassed(){
        return this.week.findPassed()
    }
    @Get('/current')
    findCurrent(){
        return this.week.findCurrent()
    }
    @Get('/:id')
    findOne(@Param('id',ParseIntPipe) id :number){
        return this.week.findOne(id)
    }
    @Post()
    createWeek(@Body()  body:CreateWeekDto){
        return this.week.create(body)
    }
    @Delete('/:id')
    deleteWeek(@Param('id') id :number){
        return this.week.delete(id)
    }
    @Patch(':id')
    updateWeek(@Param('id',ParseIntPipe) id: number,@Body() body:UpdateWeekDto){
        return this.week.update(id,body)
    }

}
