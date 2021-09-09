import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import { InvalidRoutes } from "../routes/invalid.routes";
import { ManageNoteRoutes } from "../routes/note.routes";

class App {

   public app: express.Application;
   public mongoUrl: string = 'mongodb://localhost/notes-taking-prj';

   private manageNoteRoutes: ManageNoteRoutes = new ManageNoteRoutes();
   private invalidRoutes: InvalidRoutes = new InvalidRoutes(); 

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();      
      this.manageNoteRoutes.route(this.app);
      this.invalidRoutes.route(this.app);
   }

   private config(): void {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }

}
export default new App().app;