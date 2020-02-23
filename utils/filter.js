import moment from 'moment'

export function formatTime (data, formatStr) {
  if (data) {
    formatStr = formatStr || 'YYYY-MM-DD'
    return moment(data).format(formatStr)
  } else {
    return ''
  }
}
