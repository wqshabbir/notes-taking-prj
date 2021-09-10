import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import { INote } from '../../lib/modules/notes/model';
import { INoteService } from "../../lib/modules/notes/Iservice";
import { NoteController } from "../../lib/controllers/noteController";
import { newNotes } from "../seed";


let mockNoteService: INoteService = {
    createNote(note_params: INote, callback: any): void { },
    getAllNotes(query: any, callback: any): void { },
    filterNote( query: any, callback: any): void { },
    updateNote( note_params: INote, callback: any): void { },
    deleteNote (_id: String, callback: any): void { }
};

describe("Note controller Should", function() {

    it("get all notes", async function() {
        let res = { status (stat) { return this; },
                    json  (result) {
                        expect(result).to.be.instanceof(Array);
                        (<INote>result[0]).title.should.equal("test123");
                    }
        };

        let findAllSpy       = sinon.spy(mockNoteService, "getAllNotes");
        const noteController = new NoteController(mockNoteService);

        await noteController.create_note(<any>{}, <any>res);

        findAllSpy.calledOnce.should.be.true;
        findAllSpy.restore();
    });

    it("find a note", async function() {
        let req = { params: { id: "000ABC" }};
        let res = { status (stat) { return this; },
                    json  (result) {
                        (<INote>result).title.should.equal("test123");
                    }
        };

        let findByIdSpy      = sinon.spy(mockNoteService, "filterNote");
        const noteController = new NoteController(mockNoteService);

        await noteController.get_note(<any>req, <any>res);

        findByIdSpy.calledOnce.should.be.true;
        findByIdSpy.firstCall.args[0].should.equal("000ABC");
        findByIdSpy.restore();
    });

    it("save a note", async function() {
        let req = { body: newNotes[0] };
        let res = { status (stat) { return this; },
                    json  (result) {
                        (<INote>result).title.should.equal("test123");
                    }
        };

        let saveSpy          = sinon.spy(mockNoteService, "createNote");
        const noteController = new NoteController(mockNoteService);

        await noteController.create_note(<any>req, <any>res);

        saveSpy.calledOnce.should.be.true;
        saveSpy.firstCall.args[0].title.should.equal("test123");
        saveSpy.restore();
    });

    it("update a note", async function() {
        let req = { params: { id: "000ABC" } , body: newNotes[0] };
        let res = { status (stat) { return this; },
                    json  (result) {
                        (<INote>result).title.should.equal("test123");
                    }
        };

        let updateSpy        = sinon.spy(mockNoteService, "updateNote");
        const noteController = new NoteController(mockNoteService);

        await noteController.update_note(<any>req, <any>res);

        updateSpy.calledOnce.should.be.true;
        updateSpy.firstCall.args[0].title.should.equal("test123");
        updateSpy.restore();
    });



    it("delete a note", async function() {
        let req = { params: { id: "000ABC" }};
        let res = { status (stat) { stat.should.be.equal(202);
                                     return this; },
                    json  (result) {},
                    end   () {}
        };

        let deleteSpy        = sinon.spy(mockNoteService, "deleteNote");
        const noteController = new NoteController(mockNoteService);

        await noteController.delete_note(<any>req, <any>res);

        deleteSpy.calledOnce.should.be.true;
        deleteSpy.firstCall.args[0].should.equal("000ABC");
        deleteSpy.restore();
    });

});