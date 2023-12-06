import { getFirestore } from 'firebase/firestore';

import app from './init.ts';

const fsdb = getFirestore(app);

export default fsdb;
