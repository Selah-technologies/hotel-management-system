import { CANCELLATION_POLICY_TEXT } from '../config'

export default function PolicyNotice() {
  return (
    <section aria-labelledby="policy-title" className="rounded-lg border border-stone-300 bg-stone-50 p-4 text-sm text-stone-800">
      <h3 id="policy-title" className="font-semibold">
        Cancellation policy
      </h3>
      <p className="mt-1">
        {CANCELLATION_POLICY_TEXT ?? 'The hotel’s cancellation policy will appear here once it is confirmed.'}
      </p>
    </section>
  )
}
