import {
  BalanceActivityCallback,
  GetBalanceActivityOptions,
  RetrieveBalanceActivitiesResult,
  BalanceActivity,
} from './types'

/**
 * A balance monitor is a tool used to track the change in balance of addresses on chain.
 * There is no persistance, so a current balance cannot be calculated directly. Instead, activities
 * should be recorded on some persistance layer (ie a database) where balance calculations can
 * be performed as a sum of the `amount` field.
 *
 * There are two ways to track activities, a continuous live stream and a historic retrieval stream.
 * For a live stream of activity, subscribe to addresses with `subscribeAddresses` and listen for
 * activities with `onBalanceActivity`.
 * For historic data, use `retrieveBalanceActivities` to query all activities, or optionally provide
 * a block range.
 *
 * Additionally, `txToBalanceActivity` helper is provided to convert raw transactions to an activity,
 * if applicable. Useful for recording activity of a recently sent transaction in advance.
 */
export interface BalanceMonitor {
  /**
   * Initialize the monitor and any connections required.
   */
  init(): Promise<void>

  /**
   * Deinitialize the monitor and any connections that are established.
   */
  destroy(): Promise<void>

  /**
   * @param addresses The addresses to watch for balance activity on
   */
  subscribeAddresses(addresses: string[]): Promise<void>

  /**
   * Add an event listener that is called whenever a subscribed address's balance changes.
   * This only applies to addresses subscribed with `subscribeAddress` and is not related
   * to the `retrieveBalanceActivities` method.
   *
   * @param callbackFn A callback to receive incoming activities
   */
  onBalanceActivity(callbackFn: BalanceActivityCallback): void

  /**
   * Streaming retrieval of all balance activities for an address in a specified block range.
   * Each matching activity will be passed to the provided callback and then the method
   * will resolve to the from/to block numbers actually used (in some cases not all requested can
   * be retrieved).
   *
   * @param address The address to get activity of
   * @param callbackFn A callback to receive incoming activities
   * @param options Optionally specify a range. Defaults to entire history.
   */
  retrieveBalanceActivities(
    address: string,
    callbackFn: BalanceActivityCallback,
    options?: GetBalanceActivityOptions,
  ): Promise<RetrieveBalanceActivitiesResult>

  /**
   * Return the balance activity for the address in a provided raw transaction. If the tx
   * does not apply to the address, has failed, or for any other reason doesn't have any activity
   * then null is returned. Errors can still be thrown on request errors or in other exceptional
   * circumstances.
   *
   * @param address The address the balance activity should apply to
   * @param tx The raw transaction object returned by the network
   */
  txToBalanceActivity(address: string, tx: object): Promise<BalanceActivity | null>
}
