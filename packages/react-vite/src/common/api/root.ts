import { ofetch } from 'ofetch';

export const fetch = ofetch.create({ baseURL: 'http://localhost:8080/api' });
