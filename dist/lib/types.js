import * as t from 'io-ts';
import { requiredOptionalCodec, extendCodec, enumCodec, nullable, DateT } from '@faast/ts-common';
export var AddressOrIndex = t.union([t.string, t.number], 'AddressOrIndex');
export var FeeLevel;
(function (FeeLevel) {
    FeeLevel["Custom"] = "custom";
    FeeLevel["Low"] = "low";
    FeeLevel["Medium"] = "medium";
    FeeLevel["High"] = "high";
})(FeeLevel || (FeeLevel = {}));
export var FeeLevelT = enumCodec(FeeLevel, 'FeeLevel');
export var FeeRateType;
(function (FeeRateType) {
    FeeRateType["Main"] = "main";
    FeeRateType["Base"] = "base";
    FeeRateType["BasePerWeight"] = "base/weight";
})(FeeRateType || (FeeRateType = {}));
export var FeeRateTypeT = enumCodec(FeeRateType, 'FeeRateType');
export var FeeOptionCustom = requiredOptionalCodec({
    feeRate: t.string,
    feeRateType: FeeRateTypeT,
}, {
    feeLevel: t.literal(FeeLevel.Custom),
}, 'FeeOptionCustom');
export var FeeOptionLevel = t.type({
    feeLevel: t.union([
        t.literal(FeeLevel.High),
        t.literal(FeeLevel.Medium),
        t.literal(FeeLevel.Low),
    ])
}, 'FeeOptionLevel');
export var FeeOption = t.union([
    FeeOptionCustom,
    FeeOptionLevel,
], 'FeeOption');
export var CreateTransactionOptions = FeeOption;
export var ResolvedFeeOption = t.type({
    targetFeeLevel: FeeLevelT,
    targetFeeRate: t.string,
    targetFeeRateType: FeeRateTypeT,
    feeBase: t.string,
    feeMain: t.string,
});
export var BalanceResult = t.type({
    balance: t.string,
    unconfirmedBalance: t.string,
}, 'BalanceResult');
export var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["Unsigned"] = "unsigned";
    TransactionStatus["Signed"] = "signed";
    TransactionStatus["Pending"] = "pending";
    TransactionStatus["Confirmed"] = "confirmed";
    TransactionStatus["Failed"] = "failed";
})(TransactionStatus || (TransactionStatus = {}));
export var TransactionStatusT = enumCodec(TransactionStatus, 'TransactionStatus');
export var TransactionCommon = t.type({
    id: nullable(t.string),
    fromAddress: nullable(t.string),
    toAddress: nullable(t.string),
    toExtraId: nullable(t.string),
    fromIndex: nullable(t.number),
    toIndex: nullable(t.number),
    amount: nullable(t.string),
    fee: nullable(t.string),
    status: TransactionStatusT,
}, 'TransactionCommon');
var UnsignedCommon = extendCodec(TransactionCommon, {
    fromAddress: t.string,
    toAddress: t.string,
    fromIndex: t.number,
    targetFeeLevel: FeeLevelT,
    targetFeeRate: nullable(t.string),
    targetFeeRateType: nullable(FeeRateTypeT),
}, 'UnsignedCommon');
export var BaseUnsignedTransaction = extendCodec(UnsignedCommon, {
    status: t.literal('unsigned'),
    data: t.UnknownRecord,
}, 'BaseUnsignedTransaction');
export var BaseSignedTransaction = extendCodec(UnsignedCommon, {
    status: t.literal('signed'),
    id: t.string,
    amount: t.string,
    fee: t.string,
    data: t.UnknownRecord,
}, 'BaseSignedTransaction');
export var BaseTransactionInfo = extendCodec(TransactionCommon, {
    id: t.string,
    amount: t.string,
    fee: t.string,
    isExecuted: t.boolean,
    isConfirmed: t.boolean,
    confirmations: t.number,
    block: nullable(t.number),
    date: nullable(DateT),
    data: t.UnknownRecord,
}, 'BaseTransactionInfo');
export var BaseBroadcastResult = t.type({
    id: t.string,
}, 'BaseBroadcastResult');
//# sourceMappingURL=types.js.map