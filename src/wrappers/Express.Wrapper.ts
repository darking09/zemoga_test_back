class ExpressWrapper {
  server;
  port: number;

  constructor(port:number, server:any) {
    this.server = server();
    this.port = port;
  }

  get(path: string, callback:any) {
    this.server.get(path, callback);
    return this;
  }

  all(path: string, callback:any) {
    this.server.all(path, callback);
    return this;
  }

  loadMiddlewares(middlewares : Array<any>): void {
    middlewares.map(mw => this.server.use(mw));
  }

  run() {
    this.server.listen(this.port);
    console.log(`Server on port`, this.port);
  }
}


export default ExpressWrapper;
