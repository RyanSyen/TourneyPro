import { Prisma } from "@prisma/client";

/*
P100x codes = connection/config/runtime errors (Prisma CLI & Engine startup)

P200x–P203x = runtime query errors

Prisma reserves codes up to P2034 as of v5.x
*/

export function handlePrismaError(err: unknown): never {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P1000":
        throw new Error("Authentication failed against the database.");

      case "P1001":
        throw new Error("Database server not found or unreachable.");

      case "P1002":
        throw new Error("Database server timed out.");

      case "P1003":
        throw new Error("Database does not exist.");

      case "P1008":
        throw new Error("Operation timed out.");

      case "P1009":
        throw new Error("Database already exists.");

      case "P1010":
        throw new Error("Access denied for database operation.");

      case "P1011":
        throw new Error("Error opening a TLS connection.");

      case "P1012":
        throw new Error("Schema validation error.");

      case "P1013":
        throw new Error("Invalid database URL.");

      case "P1014":
        throw new Error("Relation violation or introspection issue.");

      case "P1015":
        throw new Error("Unsupported database feature.");

      case "P1016":
        throw new Error("Prisma schema is not valid.");

      case "P2000":
        throw new Error("Input value is too long for the column.");

      case "P2001":
        throw new Error("Record not found for the given filter.");

      case "P2002":
        throw new Error("Unique constraint failed on one or more fields.");

      case "P2003":
        throw new Error("Foreign key constraint failed.");

      case "P2004":
        throw new Error("Constraint failed on the database.");

      case "P2005":
        throw new Error("Invalid value for the field.");

      case "P2006":
        throw new Error("Missing value for a required field.");

      case "P2007":
        throw new Error("Invalid JSON value.");

      case "P2008":
        throw new Error("Query parsing failed in Prisma engine.");

      case "P2009":
        throw new Error("Query validation failed in Prisma engine.");

      case "P2010":
        throw new Error("Raw query failed. Check the parameters.");

      case "P2011":
        throw new Error("Null constraint failed on field.");

      case "P2012":
        throw new Error("Missing required field.");

      case "P2013":
        throw new Error("Missing 'where' condition in the query.");

      case "P2014":
        throw new Error("Relation violation: child record required.");

      case "P2015":
        throw new Error("No record found for the operation.");

      case "P2016":
        throw new Error("Query interpretation error.");

      case "P2017":
        throw new Error("Multiple records found where one expected.");

      case "P2018":
        throw new Error("Invalid record ID structure.");

      case "P2019":
        throw new Error("Input error: value out of allowed range.");

      case "P2020":
        throw new Error("Value too large for column.");

      case "P2021":
        throw new Error("Table does not exist.");

      case "P2022":
        throw new Error("Column does not exist.");

      case "P2023":
        throw new Error("Inconsistent column data.");

      case "P2024":
        throw new Error("Timed out fetching a new connection from the pool.");

      case "P2025":
        throw new Error("Record to update/delete does not exist.");

      case "P2026":
        throw new Error("Unsupported feature by database.");

      case "P2027":
        throw new Error("Transaction failed due to conflict or constraint.");

      case "P2028":
        throw new Error("Transaction API error in underlying driver.");

      case "P2030":
        throw new Error("Cannot start transaction: already in a transaction.");

      case "P2031":
        throw new Error("Invalid transaction state.");

      case "P2033":
        throw new Error("Invalid argument passed to query.");

      case "P2034":
        throw new Error("Invalid enum value used in query.");

      default:
        throw new Error(`Unhandled Prisma error code: ${err.code}`);
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    throw new Error(`Validation error: ${err.message}`);
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new Error(`Unknown database error: ${err.message}`);
  }

  if (err instanceof Prisma.PrismaClientRustPanicError) {
    throw new Error("Prisma engine crashed (Rust panic)");
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    throw new Error(`Prisma initialization failed: ${err.message}`);
  }

  throw err; // fallback for unexpected types
}
