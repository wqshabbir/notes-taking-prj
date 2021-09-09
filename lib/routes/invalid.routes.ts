import { Application, Request, Response } from 'express';

export class InvalidRoutes {
    public route(app: Application) {

        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Invalid url' });
        });

    }
}
