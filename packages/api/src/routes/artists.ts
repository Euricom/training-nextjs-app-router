import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { prisma } from '../db';
import { getOrderBy } from '../utils/db/query';
import { getSearchParams } from '../utils/http/params';
import { notFound } from '../utils/http/responses';

const artist = new Hono()
  .get('/', async (ctx) => {
    console.log(`GET /artists`);
    const artists = await prisma.artist.findMany({});
    return ctx.jsonT(artists);
  })
  .get('/:id', async (ctx) => {
    const id = Number(ctx.req.param('id'));
    console.log(`GET /artists/${id}`);

    const artist = await prisma.artist.findFirst({
      where: { id },
    });
    if (!artist) {
      throw new HTTPException(404, {
        res: ctx.json(notFound(`Artist with not found`)),
      });
    }
    return ctx.jsonT(artist);
  });

export default artist;
