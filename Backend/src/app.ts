import * as express from 'express';
import Service from './servers/servers';
import Controller from './controllers/controller';

const userFactory = () => {
  const service = new Service();
  const controller = new Controller(service);

  return controller;
};

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: 'Hello Backend 2' }));
    this.routes();
  }

  routes() {
    this.app.post('/register', (req, res) => userFactory().createUser(req, res));
    this.app.post('/login', (req, res) => userFactory().login(req, res));
    this.app.get('/users', (req, res) => userFactory().GetAllUsers(req, res));
    // this.app.post('/account', (req, res) => userFactory().createAccount(req, res));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');

      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
