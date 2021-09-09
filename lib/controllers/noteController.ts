import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { INote } from '../modules/notes/model';
import NoteService from '../modules/notes/service';
import e = require('express');

export class NoteController {

    private noteService: NoteService = new NoteService();

    public create_note(req: Request, res: Response) {
        if (req.body.title && req.body.description && req.body.owner && req.body.creationDate &&
            req.body.modificationDate) {
            const note_params: INote = {
                title: req.body.title,
                description: req.body.description,
                owner: req.body.owner,
                creationDate: req.body.creationDate,
                modificationDate: req.body.modificationDate
            };
            this.noteService.createNote(note_params, (err: any, note_data: INote) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create note successfull', note_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_note(req: Request, res: Response) {
        if (req.params.id) {
            const note_filter = { _id: req.params.id };
            this.noteService.filterNote(note_filter, (err: any, note_data: INote) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get note successfull', note_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_all_notes(req: Request, res: Response) {
        const note_filter = {};
            this.noteService.getAllNotes(note_filter, (err: any, note_data: INote) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get all notes successfull', note_data, res);
            }
        });
    }

    public update_note(req: Request, res: Response) {
        if (req.params.id &&
            req.body.title && req.body.description && req.body.owner && req.body.creationDate &&
            req.body.modificationDate) {
            const filter = { _id: req.params.id };
            this.noteService.filterNote(filter, (err: any, note_data: INote) => {
                if (err) {
                    mongoError(err, res);
                } else if (note_data) {                    
                    const note_params: INote = {
                        _id: req.params.id,
                        title: req.body.title ? req.body.title : note_data.title,
                        description: req.body.description ? req.body.description : note_data.description,
                        owner: req.body.owner ? req.body.owner : note_data.owner,
                        creationDate: req.body.creationDate ? req.body.creationDate : note_data.creationDate,
                        modificationDate: req.body.modificationDate ? req.body.modificationDate : note_data.modificationDate                        
                    };
                    this.noteService.updateNote(note_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update note successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid note noticed', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_note(req: Request, res: Response) {
        if (req.params.id) {
            this.noteService.deleteNote(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete note successfull', null, res);
                } else {
                    failureResponse('invalid note noticed', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}