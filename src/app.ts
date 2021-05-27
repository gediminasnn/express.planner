import './Utils/Bootstrap';

import Bootstrap from './Bootstrap';

import Example from './Controllers/Example';

const app = new Bootstrap([new Example()]);

app.initializeConnection().catch((e) => console.log(e));

app.listen();
