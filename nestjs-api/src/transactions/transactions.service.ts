import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TenantService } from '../tenant/tenant.service';
import { Sequelize } from 'sequelize-typescript';
import { Account } from '../accounts/entities/account.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    @InjectModel(Account) private accountModel: typeof Account,
    private tenantService: TenantService,
    private sequelize: Sequelize,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const atomic = await this.sequelize.transaction();
    try {
      const transaction = await this.transactionModel.create({
        ...createTransactionDto,
        account_id: this.tenantService.tenant.id,
      });
      const amount =
        createTransactionDto.type === TransactionType.DEBIT
          ? -transaction.amount
          : transaction.amount;

      const account = await this.accountModel.findByPk(transaction.account_id, {
        lock: atomic.LOCK.UPDATE,
        transaction: atomic,
      });
      await account.update(
        { balance: account.balance + amount },
        { transaction: atomic },
      );
      await atomic.commit();
      return transaction;
    } catch (e) {
      await atomic.rollback();
      throw e;
    }
  }

  findAll() {
    console.log(this.tenantService.tenant.id);
    return this.transactionModel.findAll({
      where: {
        account_id: this.tenantService.tenant.id,
      },
    });
  }
}
