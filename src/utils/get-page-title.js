import defaultSettings from '@/settings'

const title = defaultSettings.title || '睿齿云'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
