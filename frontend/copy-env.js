import { copyFileSync } from "node:fs";
import { join } from "node:path";

const src = join(process.cwd(), "env.json");
const dest = join(process.cwd(), "dist", "env.json");

copyFileSync(src, dest);
console.log(`Copied ${src} to ${dest}`);
