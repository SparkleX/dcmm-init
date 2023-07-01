import { Command } from "commander"

const program = new Command();

program
  .name("dcmm-init")
  .description("dcmm database install tools")
  .version("1.0.0");

program
  .description("create database")
  .argument("<dbName>", "database / schema name")
  .action((dbName) => {
    console.log(dbName);
  });

program.parse();