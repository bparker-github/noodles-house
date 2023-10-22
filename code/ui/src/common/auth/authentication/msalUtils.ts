import {
  EventType,
  type AccountInfo,
  type EventMessage,
  type IPublicClientApplication,
} from '@azure/msal-browser';
import type { MaybeRef } from 'vue';
import { toValue } from 'vue';

/**
 * A helper function to add a callback to the message handler.
 * The utility comes from specifying which eventTypes to work on.
 * If events is omitted, the CB will be run on *all* event types.
 */
export function addMsalCallback(
  app: MaybeRef<IPublicClientApplication>,
  cb: (msg: EventMessage) => void,
  ...events: EventType[]
): void {
  toValue(app).addEventCallback((msg: EventMessage) => {
    if (!events.length || events.includes(msg.eventType)) {
      cb(msg);
    }
  });
}

/**
 * Compare a single account/null to see if the IDs are the same.
 * @param a The first account to compare, if present.
 * @param b The second account to compare, if present.
 */
export function compareNoodleAccountInfo(a?: AccountInfo | null, b?: AccountInfo | null) {
  return (
    !!a &&
    !!b &&
    a.homeAccountId === b.homeAccountId &&
    a.localAccountId === b.localAccountId &&
    a.username === b.username
  );
}
/**
 * Compare two arrays of accounts to ensure they are the same.
 * @param arrayA The first list of accounts to compare.
 * @param arrayB The second list of accounts to compare.
 */
export function areNoodleAccountArraysEqual(arrayA: AccountInfo[], arrayB: AccountInfo[]): boolean {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  return arrayA.every((eA, i) => compareNoodleAccountInfo(eA, arrayB[i]));
}
