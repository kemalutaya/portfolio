import ShowcaseGrid from '@/components/ShowcaseGrid'

/**
 * Automation (route /showcase): the case study of the three macros. Like
 * Projects and Services, the whole view is one grid component with its own head and glass - no ViewShell, because there is no scrolling
 * stack of legacy sections here to reveal.
 */
export default function ShowcaseView() {
  return <ShowcaseGrid />
}
