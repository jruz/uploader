import multer from 'multer';
import express, { Request, Response } from 'express';
import fs from 'fs';
import helmet, { contentSecurityPolicy } from 'helmet';
import { promisify } from 'util';
import path from 'path';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 5000;
const upload = multer({ dest: 'uploads/' });
const storePath = 'store.json';
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const csrf = csurf({ cookie: true });

const getStore = async () => {
  try {
    const file = await readFile(storePath);
    const data = String(file);
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return [];
  }
};

interface Data {
  name: string;
  mimetype: string;
  id: string;
  size: number;
  createdAt: number;
}

const updateStore = async (data: Data) => {
  const json = JSON.stringify(data);
  try {
    await writeFile(storePath, json);
  } catch (e) {
    console.log(e);
  }
};

const formatFile = ({
  originalname,
  mimetype,
  filename,
  size,
}: Request['file']): Data => ({
  name: originalname,
  mimetype,
  id: filename,
  size,
  createdAt: Date.now(),
});

app.set('view engine', 'pug');
app.set('views', 'src');
app.use(express.static('public'));
app.use(helmet());
app.use(cookieParser());
app.use(
  contentSecurityPolicy({
    directives: {
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      connectSrc: ["'self'"],
      defaultSrc: ["'none'"],
      imgSrc: ["'self'"],
      sandbox: ['allow-scripts', 'allow-same-origin', 'allow-forms'],
      scriptSrc: ["'self' 'unsafe-inline'"],
      styleSrc: ["'self' 'unsafe-inline' blob:"],
    },
  }),
);

app.get('/', csrf, (req: Request, res: Response) => {
  res.render('index', { csrfToken: req.csrfToken() });
});

app.get('/files', async (_req: Request, res: Response) => {
  const store = await getStore();
  res.json(store);
});

app.get('/files/:id', async (req: Request, res: Response) => {
  const store = await getStore();
  const file = store.find((item: Data) => item.id === req.params.id);
  if (file) {
    const filePath = path.resolve(`uploads/${file.id}`);
    res.download(filePath, file.name);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.delete('/files/:id', csrf, async (req: Request, res: Response) => {
  const store = await getStore();
  const { id } = req.params;
  const index = store.findIndex((item: Data) => item.id === id);
  if (index !== -1) {
    store.splice(index, 1);
    const filePath = path.resolve(`uploads/${id}`);
    try {
      await unlink(filePath);
      await updateStore(store);
      res.json(store);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.post(
  '/files',
  csrf,
  upload.single('file'),
  async (req: Request, res: Response) => {
    if (req.file) {
      const store = await getStore();
      const file = formatFile(req.file);
      store.push(file);
      await updateStore(store);
      res.json(store);
    } else {
      res.status(400).json({ error: 'Bad request' });
    }
  },
);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
