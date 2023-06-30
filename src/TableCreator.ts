/*import { PgSqlConnectionConfig, PgSqlDriver } from "db-conn-pgsql";
import { SqlType, Connection } from "db-conn";

import glob from "glob";
import jsonfile from "jsonfile";

import { PostgresDialect, ObjectMetadata, MColumn } from "metal-dialect";
import path from "path";
import { FieldUtils } from "../utils/FieldUtils.js";
import { Table } from "../generated/schema/Table.js";

class CreateTable {
	conn: Connection;
	oDialect: PostgresDialect;
	public async createTable(metaTable: Table, name: string): Promise<void> {
		const columns = [];
		const oColumn: MColumn = {
			name: "Id",
			size: 40,
			type: SqlType.varchar
		}
		columns.push(oColumn);
		const oColumnParentId: MColumn = {
			name: "ParentId",
			size: 40,
			type: SqlType.varchar
		}
		columns.push(oColumnParentId);
		const fields = Object.keys(metaTable.fields).sort();
		for (const field of fields) {
			let metaField = metaTable.fields[field];
			metaField = FieldUtils.loadField(metaField);
			if (!metaField) {
				throw new Error(`${name}.${field} not defined`);
			}
			const oColumn: MColumn = {
				name: field,
				size: metaField.size > 0 ? metaField.size : 1,
				precision: 19,
				scale: 6,
				type: null
			}
			switch (metaField.type) {
				case "uuid":
					oColumn.type = SqlType.varchar;
					oColumn.size = 40;
					break;
				case "string":
					oColumn.type = SqlType.varchar;
					break;
				case "number":
					oColumn.type = SqlType.integer;
					break;
				case "decimal":
					oColumn.type = SqlType.decimal;
					break;
				case "text":
					oColumn.type = SqlType.clob;
					break;
				case "time":
					oColumn.type = SqlType.time;
					break;
				case "date":
					oColumn.type = SqlType.date;
					break;
				default:
					break;
			}
			columns.push(oColumn);
		}
		const sql = this.oDialect.createTable(name, columns, ["Id"]);
		await this.conn.execute(sql);
	}

	public async main(): Promise<void> {
		const oDriver = new PgSqlDriver();
		const oConfig: PgSqlConnectionConfig = {
			user: "postgres",
			host: "localhost",
			//database: "postgres",
			password: "1234",
			port: 5432
		}

		this.conn = await oDriver.connect(oConfig);
		//await conn.execute("drop schema if exists test");
		//await conn.execute("create schema test");
		//await conn.execute("set search_path to test");
		await this.conn.execute("drop database if exists test");
		await this.conn.execute("create database test");
		oConfig.database = "test";
		await this.conn.close();
		this.conn = await oDriver.connect(oConfig);

		const files = glob.sync(`resources/table/*.json`);
		const metadata = new ObjectMetadata();
		this.oDialect = new PostgresDialect(metadata);
		for (const file of files) {
			console.debug(file);
			const a = path.basename(file);
			const tableName = a.split('.')[0];
			const metaTable: Table = jsonfile.readFileSync(file);
			if (metaTable.transient) {
				continue;
			}

			await this.createTable(metaTable, tableName);
		}
		const templateFiles = glob.sync(`resources/tableTemplate/*.tableTemplate.json`);
		for (const file of templateFiles) {
			console.debug(file);
			const metaTable: Table = jsonfile.readFileSync(file);
			for (const table of metaTable.tables) {
				console.debug(table);
				await this.createTable(metaTable, table);
			}
		}
		await this.conn.close();
	}
}

const oCreateTable = new CreateTable();
oCreateTable.main();*/