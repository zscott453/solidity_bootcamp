import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("contract-address")
  getContractAddress(): string {
    return this.appService.getContractAddress();
  }

  @Get('total-supply')
  getTotalSupply(): Promise<number> {
    return this.appService.getTotalSupply();
  }

  @Get('allowance')
  async getAllowance(
    @Query('from') from:string,
    @Query('to') to:string,
  ): Promise<number> {
    return await this.appService.getAllowance
    (from, to);
  }

  @Get('transaction-status')
  async getTransactionStatus(@Query('hash')
  hash: string): Promise<string> {
    return await this.appService.
    getTransactionStatus(hash);
  }

  @Get("payment-orders")
  getPaymentOrders() {
    return this.appService.getPaymentOrders();
  }

  @Post("payment-order")
  createPaymentOrder(@Body () body: CreatePaymentOrderDTO) {
  return this.appService.contract.
  createPaymentOrder(body.value, body.secret);

}


}
