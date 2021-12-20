import {
  TransactionCategory,
  TransactionCategoryList,
  TransactionType,
  TransactionTypeList
} from "../entities/transaction.entity";
import { IsIn, IsISO8601, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";

export class CreateTransactionDto {

  @IsNotEmpty()
  @IsISO8601()
  payment_date: Date;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsIn(TransactionCategoryList)
  @IsNotEmpty()
  category: TransactionCategory;

  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsIn(TransactionTypeList)
  @IsNotEmpty()
  type: TransactionType;

}
