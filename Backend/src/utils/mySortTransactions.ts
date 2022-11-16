/* eslint-disable prefer-const */
import { Transaction } from '../protocols';

// 1º Data ; 2º debitedAccountId; 3º creditedAccountId.
const mySortTransactions = (myArray: Transaction[]) =>
  myArray.sort((a: Transaction, b: Transaction) => {
    let result = Number(b.createdAt) - Number(a.createdAt);
    if (result !== 0) return result;
    result = b.debitedAccountId - a.debitedAccountId;
    if (result !== 0) return result;
    result = b.creditedAccountId - a.creditedAccountId;
    if (result !== 0) return result;
    return 0;
  });
export default mySortTransactions;
