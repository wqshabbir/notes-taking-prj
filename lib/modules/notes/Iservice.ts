import { INote } from './model';

export interface INoteService {
    createNote(note_params: INote, callback: any);
    getAllNotes(query: any, callback: any);
    filterNote( query: any, callback: any);
    updateNote( note_params: INote, callback: any);
    deleteNote (_id: String, callback: any);
}