import { Agent, setGlobalDispatcher } from 'undici';

setGlobalDispatcher(
  new Agent({
    connect: {
      timeout: 300000,
    },
  })
);
