import { genNodeAPI } from 'arseeding-js';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY as string;
  const instance = await genNodeAPI(ACCOUNT_PRIVATE_KEY);
  const arseedUrl = 'https://arseed.web3infra.dev';
  const data = bufferFile('./nft.png');
  const payCurrency = 'usdc'; // everpay supported all tokens
  const ops = {
    tags: [{ name: 'Content-Type', value: 'data type' }],
  };
  const res = await instance.sendAndPay(arseedUrl, data, payCurrency, ops);
  console.log('res', res);
}

function bufferFile(relPath: string) {
  return fs.readFileSync(path.join(__dirname, relPath));
}

main();

/**
 * 
 * $ ts-node examples/demo.ts
res {
  everHash: '0x03f7715832e41779337b92261886cf50bf97c54b291285582b706d0c8494e44f',
  order: {
    itemId: '3wUlLyVAG0Qy_44susXY0rIoVqOElJb4g9W5Tb3R-nc',
    size: 518893,
    bundler: 'uDA8ZblC-lyEFfsYXKewpwaX-kkNDDw8az3IW9bDL68',
    currency: 'USDC',
    decimals: 6,
    fee: '1137',
    paymentExpiredTime: 1663575870,
    expectedBlock: 1018900
  }
}
✨  Done in 7.34s.
 * 
 * 
 * 
 */
