import ServicesGrid from '@/components/ServicesGrid'

/**
 * Services is one glass sheet like Projects: how an eligibility check
 * resolves, the six services, and the schedule macro drawn as a flow. No
 * ViewShell: the grid supplies its own head and there is no footer to scroll to.
 */
export default function ServicesView() {
  return <ServicesGrid />
}
