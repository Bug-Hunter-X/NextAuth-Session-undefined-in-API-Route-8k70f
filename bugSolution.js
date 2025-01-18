```javascript
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Access user data from session only after ensuring session is valid
  const userData = session.user ? session.user : null; 
  if(userData === null) {
    return res.status(500).json({ error: 'Session data unavailable'})
  }
  console.log(userData);
  res.status(200).json({ message: 'Authenticated', user: userData });
}
```