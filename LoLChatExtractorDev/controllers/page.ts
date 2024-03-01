import { Request, Response, NextFunction } from 'express';

export const renderMain = (req: Request, res: Response, next: NextFunction) => {
    res.render('main' ,{title:req.t("main.title"),guide:req.t("main.guide"),select:req.t("main.select"),extract:req.t("main.extract")});
};

export const renderUpload = (req:Request,res: Response) =>{
    res.redirect('/?uploadFailed=true');
}   