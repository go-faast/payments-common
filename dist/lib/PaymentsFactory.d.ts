import { AnyPayments } from './PaymentsInterface';
import { BaseConfig } from './types';
export interface PaymentsFactory<C extends BaseConfig = BaseConfig, P extends AnyPayments<C> = AnyPayments<C>> {
    forConfig(config: C): P;
}
