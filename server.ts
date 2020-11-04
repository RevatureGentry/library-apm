import { Application, } from "https://deno.land/x/abc@v1.0.3/mod.ts";
import { logger } from "https://deno.land/x/abc@v1.0.3/middleware/logger.ts";

const outputDir = 'library';
const dist = `dist/${outputDir}`;

const app = new Application();
app.static(`/${outputDir}/fonts`, `${dist}/fonts`)
app.static(`/${outputDir}/img`, `${dist}/img`);
app.static(`/${outputDir}/css`, `${dist}/css`);
app.static(`/${outputDir}/js`, `${dist}/js`);
app.file('/favicon.ico', `${dist}/favicon.cio`);
app.file('/library', `${dist}/index.html`);

// Root middleware
app.use(logger());

app.start({
  port: 8080
})

console.log('Application started!');
