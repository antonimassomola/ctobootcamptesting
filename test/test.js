//import {BankAccount} from '../index.js'
var assert = require('chai').assert

class BankAccount {

    constructor(id, balance = 0) {
        this.id = id
        this.balance = balance
    }

    deposit(n) {
        this.balance = this.balance + n
        return this.balance
    }

    withdrawal(n) {
        this.balance = this.balance -n
        return this.balance
    }

}

class TransferManager {

    constructor(from, to) {
        this.from = from
        this.to = to
    }

    transfer(n) {
        this.from.withdrawal(n)
        this.to.deposit(n)
        return true
    }

}

class AccountService {

    constructor(statementRepository) {
        this.statementRepository = statementRepository
    }

    withdrawal(account, amount) {
        const balance = account.withdrawal(amount)
        this.statementRepository.addStatement(account.id, 'withdrawal', amount, balance)
    }

    deposit(account, amount) {
        const balance = account.deposit(amount)
        this.statementRepository.addStatement(account.id, 'deposit', amount, balance)
    }

    listAccountStatement(account) {
        return this.statementRepository.listAccountStatement(account)
    }

}

class StatementRepository {

    constructor(statements = []) {
        this.statements = statements
    }

    addStatement(account, movementType, amount, balance) {
        this.statements.push({
            account,
            movementType,
            amount,
            balance
        })
    } 

    listAccountStatement(account) {
        return this.statements.filter(a => a.account === account)
    }

}

describe('BankAccount', function() {

    describe('Deposit', function() {
        it('must be able to make fiat deposits', function() {
            const bankAccount = new BankAccount(1)
            const deposit = bankAccount.deposit(100)
            assert.equal(deposit, 100)
        })
    })

    describe('Withdrawal', function() {
        it('must be able to make fiat withdrawals', function() {
            const bankAccount = new BankAccount(1, 120)
            const withdrawal = bankAccount.withdrawal(100)
            assert.equal(withdrawal, 20)
        })
    })

    describe('Transfers', function() {
        it('must be able to make wire transfers between accounts', function() {
            const bankAccount = new BankAccount(1, 100)
            const bankAccountB = new BankAccount(2, 0)
            const transferManager = new TransferManager(bankAccount, bankAccountB)

            const transfer = transferManager.transfer(20)
            assert.equal(transfer, true)
            assert.equal(bankAccount.balance, 80)
            assert.equal(bankAccountB.balance, 20)
        })
    })

    describe('AccountService', function() {
        it('must be able to retrieve the bank statement', function() {
            const accountService = new AccountService(new StatementRepository(
                StatementRepository.statements = [
                    {account: 1, movementType: 'withdrawal', ammount: 100, balance: 150},
                    {account: 1, movementType: 'deposit', ammount: 100, balance: 55},
                    {account: 2, movementType: 'deposit', ammount: 100, balance: 55}
                ]
            ))
            
            const statements = accountService.listAccountStatement(1)
            assert.lengthOf(statements, 2)
        })
    })

});
