(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('io-ts'), require('@faast/ts-common')) :
  typeof define === 'function' && define.amd ? define(['exports', 'io-ts', '@faast/ts-common'], factory) :
  (factory((global.faastPaymentsCommon = {}),global.t,global.tsCommon));
}(this, (function (exports,t,tsCommon) { 'use strict';

  const AddressOrIndex = t.union([t.string, t.number], 'AddressOrIndex');
  (function (FeeLevel) {
      FeeLevel["Custom"] = "custom";
      FeeLevel["Low"] = "low";
      FeeLevel["Medium"] = "medium";
      FeeLevel["High"] = "high";
  })(exports.FeeLevel || (exports.FeeLevel = {}));
  const FeeLevelT = tsCommon.enumCodec(exports.FeeLevel, 'FeeLevel');
  (function (FeeRateType) {
      FeeRateType["Main"] = "main";
      FeeRateType["Base"] = "base";
      FeeRateType["BasePerWeight"] = "base/weight";
  })(exports.FeeRateType || (exports.FeeRateType = {}));
  const FeeRateTypeT = tsCommon.enumCodec(exports.FeeRateType, 'FeeRateType');
  const FeeOptionCustom = tsCommon.requiredOptionalCodec({
      feeRate: t.string,
      feeRateType: FeeRateTypeT,
  }, {
      feeLevel: t.literal(exports.FeeLevel.Custom),
  }, 'FeeOptionCustom');
  const FeeOptionLevel = t.type({
      feeLevel: t.union([t.literal(exports.FeeLevel.High), t.literal(exports.FeeLevel.Medium), t.literal(exports.FeeLevel.Low)]),
  }, 'FeeOptionLevel');
  const FeeOption = t.union([FeeOptionCustom, FeeOptionLevel], 'FeeOption');
  const CreateTransactionOptions = FeeOption;
  const ResolvedFeeOption = t.type({
      targetFeeLevel: FeeLevelT,
      targetFeeRate: t.string,
      targetFeeRateType: FeeRateTypeT,
      feeBase: t.string,
      feeMain: t.string,
  });
  const BalanceResult = t.type({
      balance: t.string,
      unconfirmedBalance: t.string,
  }, 'BalanceResult');
  (function (TransactionStatus) {
      TransactionStatus["Unsigned"] = "unsigned";
      TransactionStatus["Signed"] = "signed";
      TransactionStatus["Pending"] = "pending";
      TransactionStatus["Confirmed"] = "confirmed";
      TransactionStatus["Failed"] = "failed";
  })(exports.TransactionStatus || (exports.TransactionStatus = {}));
  const TransactionStatusT = tsCommon.enumCodec(exports.TransactionStatus, 'TransactionStatus');
  const TransactionCommon = t.type({
      id: tsCommon.nullable(t.string),
      fromAddress: tsCommon.nullable(t.string),
      toAddress: tsCommon.nullable(t.string),
      toExtraId: tsCommon.nullable(t.string),
      fromIndex: tsCommon.nullable(t.number),
      toIndex: tsCommon.nullable(t.number),
      amount: tsCommon.nullable(t.string),
      fee: tsCommon.nullable(t.string),
      status: TransactionStatusT,
  }, 'TransactionCommon');
  const UnsignedCommon = tsCommon.extendCodec(TransactionCommon, {
      fromAddress: t.string,
      toAddress: t.string,
      fromIndex: t.number,
      targetFeeLevel: FeeLevelT,
      targetFeeRate: tsCommon.nullable(t.string),
      targetFeeRateType: tsCommon.nullable(FeeRateTypeT),
  }, 'UnsignedCommon');
  const BaseUnsignedTransaction = tsCommon.extendCodec(UnsignedCommon, {
      status: t.literal('unsigned'),
      data: t.UnknownRecord,
  }, 'BaseUnsignedTransaction');
  const BaseSignedTransaction = tsCommon.extendCodec(UnsignedCommon, {
      status: t.literal('signed'),
      id: t.string,
      amount: t.string,
      fee: t.string,
      data: t.UnknownRecord,
  }, 'BaseSignedTransaction');
  const BaseTransactionInfo = tsCommon.extendCodec(TransactionCommon, {
      id: t.string,
      amount: t.string,
      fee: t.string,
      isExecuted: t.boolean,
      isConfirmed: t.boolean,
      confirmations: t.number,
      block: tsCommon.nullable(t.number),
      date: tsCommon.nullable(tsCommon.DateT),
      data: t.UnknownRecord,
  }, 'BaseTransactionInfo');
  const BaseBroadcastResult = t.type({
      id: t.string,
  }, 'BaseBroadcastResult');

  exports.AddressOrIndex = AddressOrIndex;
  exports.FeeLevelT = FeeLevelT;
  exports.FeeRateTypeT = FeeRateTypeT;
  exports.FeeOptionCustom = FeeOptionCustom;
  exports.FeeOptionLevel = FeeOptionLevel;
  exports.FeeOption = FeeOption;
  exports.CreateTransactionOptions = CreateTransactionOptions;
  exports.ResolvedFeeOption = ResolvedFeeOption;
  exports.BalanceResult = BalanceResult;
  exports.TransactionStatusT = TransactionStatusT;
  exports.TransactionCommon = TransactionCommon;
  exports.BaseUnsignedTransaction = BaseUnsignedTransaction;
  exports.BaseSignedTransaction = BaseSignedTransaction;
  exports.BaseTransactionInfo = BaseTransactionInfo;
  exports.BaseBroadcastResult = BaseBroadcastResult;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
