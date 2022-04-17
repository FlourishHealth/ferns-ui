declare namespace Express {
  export interface Request {
    user?: {_id: string | ObjectId; id: string; admin: boolean};
  }
}
