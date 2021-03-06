import { INoteService } from './Iservice';
import { INote } from './model';
import notes from './schema';

export default class NoteService implements INoteService{
    
    public createNote(note_params: INote, callback: any) {
        const _session = new notes(note_params);
        _session.save(callback);
    }

    public getAllNotes(query: any, callback: any) {
        notes.find(query, callback);
    }

    public filterNote(query: any, callback: any) {
        notes.findOne(query, callback);
    }

    public updateNote(note_params: INote, callback: any) {
        const query = { _id: note_params._id };
        notes.findOneAndUpdate(query, note_params, callback);
    }
    
    public deleteNote(_id: String, callback: any) {
        const query = { _id: _id };
        notes.deleteOne(query, callback);
    }

    static build() {
        return new NoteService();
    }

}