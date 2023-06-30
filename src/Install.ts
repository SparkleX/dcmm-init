import { glob } from "glob";
import jsonfile from "jsonfile";
import { Table } from "dcmm-schema";
import { MySqlDialect  } from "metal-dialect";
class DbCreator {
    
    public scanTables():Table[] {
        const rt = [];
        let files = glob.sync(`resources/table/*.table.json`);
        for (const file of files) {
            const table = jsonfile.readFileSync(file) as Table;
            rt.push(table);
            console.debug(table);
        }
        return rt;
        
    }
    public createDdls(tables :Table[]): string[] {
        let oDialect = new MySqlDialect();
        let rt = [];
        for(const table of tables) {
            const sql = oDialect.createTable(table);
            rt.push(sql);
        }
        return rt;
    }
    public run() {
        const tables = this.scanTables();
        const sqls = this.createDdls(tables);
        console.debug(sqls);
        //this.createDatabase("test");
    }
}

const oCreator = new DbCreator();
oCreator.run();
