import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from '../accounts/entities/account.entity';
import { Report } from './entities/report.entity';

@Module({
  imports: [SequelizeModule.forFeature([Report, Account])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
