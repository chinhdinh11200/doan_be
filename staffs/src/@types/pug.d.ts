// file: pug.d.ts

declare namespace Express {
  export interface Response {
    render(view: string, locals?: Record<string, any>): void;
  }
}
