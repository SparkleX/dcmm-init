import { glob } from "glob";
import jsonfile from "jsonfile";
import { Table } from "dcmm-schema";




let files = glob.sync(`resources/table/*.table.json`);
for (const file of files) {
    const table = jsonfile.readFileSync(file) as Table
    console.debug(table);
}

