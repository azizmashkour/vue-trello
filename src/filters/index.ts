import Vue from 'vue'

Vue.filter('date', function (value: string, fullDate = false) {
  value = String(value)
  const date = value.slice(8, 10).trim()
  const month = value.slice(4, 7).trim()
  const year = value.slice(11, 15)

  if (!fullDate) return `${date} ${month}`
  else return `${date}/${month}/${year}`
})
