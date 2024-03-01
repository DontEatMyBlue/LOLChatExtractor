// TypeScript 타입 정의를 위한 임포트
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import path from 'path';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import i18n from './middlewares/i18next';
import i18nextMiddleware from 'i18next-http-middleware';

// 페이지 라우터 임포트 (TypeScript로 변환해야 함)
import pageRouter from './routes/page';
import postRouter from './routes/post';



dotenv.config();

const app: Application = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(i18nextMiddleware.handle(i18n));





app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', pageRouter);
app.use('/', postRouter);

// 404 처리 미들웨어
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Sorry cant find that!');
});

// 오류 처리 미들웨어
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기 중`);
});
