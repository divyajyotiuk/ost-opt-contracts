'use strict';

const config = require('./test_lib/config');
const utils = require('./test_lib/utils');
const { Event } = require('./test_lib/event_decoder');

const OptimalWalletCreator = artifacts.require('OptimalWalletCreator');

const UtilityBrandedToken = artifacts.require('UtilityBrandedToken');
const EIP20TokenMock = artifacts.require('EIP20TokenMock');
const UserWalletFactory = artifacts.require('UserWalletFactory');


contract('OptimalWalletCreator::constructor', async(accounts) => {
   
    let ubtContract;
    let ubtContractAddr;
    let walletFactoryContractAddr;
    let walletFactoryContract;
    let organizationAddr;
    let accountProvider;
    let mock;
    let deployerAddress;

    let brandedToken;

    const SYMBOL = 'MOCK';
    const NAME = 'Mock Token';
    const { decimals: DECIMALS } = config;
    
    beforeEach(async () => {

      accountProvider = new utils.AccountProvider(accounts);

      deployerAddress = accountProvider.get();

      organizationAddr = accountProvider.get();

      brandedToken = await EIP20TokenMock.new(
        SYMBOL,
        NAME,
        DECIMALS,
        { from: organizationAddr },
      );

      walletFactoryContract = await UserWalletFactory.new({ from: deployerAddress });
     
      ubtContract = await UtilityBrandedToken.new(
        brandedToken.address,
        SYMBOL,
        NAME,
        DECIMALS,
        organizationAddr,
        { from: deployerAddress },
      );
      ubtContractAddr = ubtContract.address;
      
      walletFactoryContractAddr = walletFactoryContract.address;

      });


      contract('Negative Tests', async () => {

        it('Reverts if null address is passed as organizationAddr', async () => {
          await utils.expectRevert(OptimalWalletCreator.new(
            ubtContractAddr,
            walletFactoryContractAddr,
            utils.NULL_ADDRESS,
            { from: deployerAddress }
          ),
          'Organization contract address should not be zero',
          'Organization contract address must not be zero.');
        });

      // it('Reverts if null address is passed as ubtContractAddr', async () => {
          
      //     await utils.expectRevert(OptimalWalletCreator.new(
      //       utils.NULL_ADDRESS,
      //       walletFactoryContractAddr,
      //       organizationAddr,
      //       { from: deployerAddress }
      //     ),
      //     'Utility Brand Token contract address should not be zero',
      //     'Utility Brand Token contract address must not be zero.');
      //   });

      //   it('Reverts if null address is passed as walletFactoryContractAddr', async () => {
      //       await utils.expectRevert(OptimalWalletCreator.new(
      //         ubtContractAddr,
      //         utils.NULL_ADDRESS,
      //         organizationAddr,
      //         { from: deployerAddress }
      //       ),
      //       'UserWalletFactory contract address should not be zero',
      //       'UserWalletFactory contract address must not be zero.');
      //     });
          
      });

      contract('Storage', async () => {

        it('Successfully sets state variables', async () => {
              await OptimalWalletCreator.new(
              ubtContractAddr,
              organizationAddr,
              walletFactoryContractAddr,
              { from: deployerAddress }
          );
      });
      
      });
    });