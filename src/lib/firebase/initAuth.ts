import { getAuth } from 'firebase/auth';

import app from './init.ts';

const auth = getAuth(app);

export default auth;
