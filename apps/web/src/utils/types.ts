export type Week={
    id:number;
    description:string;
    startDate: Date;
    summary:string;
    comments:string;
    goals:Goal[]
}

export type WeekField = 'summary' | 'comments';

export type GoalStatus = 'A_FAIRE' | 'EN_COURS' | 'TERMINE'

export type Goal={
    id:number;
    title:string;
    status:GoalStatus;
    description:string;
    weekId:number;
}

export type NewGoal={
    title:string;
    status:GoalStatus;
    description:string;
    weekId:number;
}
