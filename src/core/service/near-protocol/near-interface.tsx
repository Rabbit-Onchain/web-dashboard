import { utils } from 'near-api-js';

export class RabbitNft {
    contractId: any;
    wallet: any;

    constructor({ contractId, walletToUse }) {
      this.contractId = contractId;
      this.wallet = walletToUse
    }
  
    // async getNftInfo() {
    //   const messages = await this.wallet.viewMethod({ contractId: this.contractId, method: "get_nft_info" })
    //   console.log(messages)
    //   return messages
    // }
  
    async mintNft(title, rarity, amount) {
     const deposit = utils.format.parseNearAmount("1");
     // let deposit = 1
      return await this.wallet.callMethod({ 
        contractId: this.contractId, 
        method: "nft_mint", 
        args: { title: title,  rarity: rarity}, 
        deposit: deposit
      });
    }

    async extendExpired(token_id, time, amount) {
        const deposit = utils.format.parseNearAmount(amount);
        return await this.wallet.callMethod({ 
          contractId: this.contractId, 
          method: "extend_expired", 
          args: { token_id: token_id,  time: time}, deposit });
      }
  
}