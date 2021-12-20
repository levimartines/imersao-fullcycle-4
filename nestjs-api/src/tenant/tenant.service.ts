import { Injectable } from "@nestjs/common";
import { Account } from "../accounts/entities/account.entity";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class TenantService {
  private account?: Account;

  constructor(@InjectModel(Account) private accountModel: typeof Account) {
  }

  get tenant() {
    return this.account;
  }

  set tenant(tenant: Account) {
    this.account = tenant;
  }

  async setTenantBy(subdomain: string) {
    this.account = await this.accountModel.findOne({
      where: {
        subdomain,
      },
      rejectOnEmpty: true
    })
  }
}
