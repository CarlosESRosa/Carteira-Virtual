import * as express from 'express';
import Service from './servers/servers';
import Controller from './controllers/controller';
import authToken from './middlewares/authToken';

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

    this.app.get('/', (req, res) => res.json({ ok: 'Backend working' }));
    this.routes();
  }

  routes() {
    this.app.post('/register', (req, res) => userFactory().createUser(req, res));
    this.app.post('/login', (req, res) => userFactory().login(req, res));
    this.app.get('/balance', authToken, (req, res) => userFactory().GetBalance(req, res));
    this.app.post('/transaction', authToken, (req, res) => userFactory().createTransaction(req, res));
    this.app.get('/transactions', authToken, (req, res) => userFactory().getTransactions(req, res));
    this.app.get('/filtredTransactions', authToken, (req, res) => userFactory().getFiltredTransactions(req, res));
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
