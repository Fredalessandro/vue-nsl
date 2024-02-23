// src/EventBus.js

import { createApp } from 'vue';

const app = createApp({});
export default app.config.globalProperties.$eventBus || app;