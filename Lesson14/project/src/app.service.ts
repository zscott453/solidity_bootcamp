import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json'

const CONTRACT_ADDRESS = 
'insert address';

@Injectable()
export class AppService {
  provider;
  contract;

  paymentOrders: PaymentOrder[];

  constructor() {
    this.provider = ethers.getDefaultProvider('goerli');
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      tokenJson.abi,
      this.provider 
    );
    this.paymentOrders = []l;
  }
  
  getContractAddress(): string {
   return this.contract.address;
  }

  async getTotalSupply(): Promise<number> {
    const totalSupplyBN = await this.contract.
    totalSupply(); 
    const totalSupplyString = ethers.utils.formatEther
    (totalSupplyBN);
    const totalSupplyNumber = parseFloat
    (totalSupplyString);
    return totalSupplyNumber;
  }

  async getAllowance(): Promise<number> {
    const allowanceBN =  await this.contract.allowance(
      from,
      to,
    );
    const allowanceString = ethers.utils.formatEther
    (allowanceBN);
    const allowanceNumber = parseFloat
    (allowanceString);
    return allowanceNumber;
  }

  async getTransactionStatus(hash: string):
  Promise<string> {
    const tx = await this.provider.getTransactionStatus(hash);
    const txreceipt = await Tx.wait();
    returnt txreceipt,status == 1 ? 'Completed':
    'Reverted';
  }

  getPaymentOrders() {
    return this.paymentOrders;
  }

  createPaymentOrder(value: number, secret: string) {
    const newPaymentOrder = new PaymentOrder();
    newPaymentOrder.value = value;
    newPaymentOrder.secret = secret;
    newPaymentOrder.id = this.paymentOrders.length;;
    this.paymentOrders.push(newPaymentOrder);
    return newPaymentOrder.id;

  }

  fulfillPaymentOrder(id: number, secret: string,
    address: string) {
      // TODO: check is secret is correct
      // Pick the pkey from env
      // Build a signer
      // Connect signer to the contract
      // Call the Mint function passing value to mint to address
    }



}
