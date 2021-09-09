import { Application, Request, Response } from 'express';
import { NoteController } from '../controllers/noteController';

export class ManageNoteRoutes {

    private notecontroller: NoteController = new NoteController();

    public route(app: Application) {
        
        app.post('/api/v1/note', (req: Request, res: Response) => {
            this.notecontroller.create_note(req, res);
        });

        app.get('/api/v1/note/:id', (req: Request, res: Response) => {
            this.notecontroller.get_note(req, res);
        });

        app.put('/api/v1/note/:id', (req: Request, res: Response) => {
            this.notecontroller.update_note(req, res);
        });

        app.delete('/api/v1/note/:id', (req: Request, res: Response) => {
            this.notecontroller.delete_note(req, res);
        });

    }
}