/**
 * This module returns the absolute path to the root of this project.
 * Make sure to keep this file in the src folder.
 */

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __rootpath = path.join(path.dirname(__filename), "..");

export default __rootpath;
