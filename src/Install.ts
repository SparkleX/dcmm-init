#!/usr/local/bin/node
import { glob } from "glob";
import jsonfile from "jsonfile";
import { Table } from "dcmm-schema";
import { MySqlDialect  } from "metal-dialect";
import { MySqlDriver } from "db-conn-mysql";
import dotenv from "dotenv";
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
    public async run() {
        dotenv.config();
        const tables = this.scanTables();
        const sqls = this.createDdls(tables);
        await this.createDatabase("test", sqls);
    }
    public async createDatabase(name: string, sqls: string[]) {
        const oConfig = JSON.parse(process.env.DB_CONFIG);
       const oDriver = new MySqlDriver();
       process.env.DB_CONFIG
       const conn = await oDriver.connect(oConfig);
       for(const sql of sqls) {
        console.debug(sql);
        await conn.execute(sql);
       }
       await conn.close();
    }
}

const oCreator = new DbCreator();
oCreator.run();
